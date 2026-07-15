// ── Front-End LLM Client ──────────────────────────────────────
// Routes execution requests safely to the local Node.js Express backend.
// API keys are resolved SERVER-SIDE from encrypted storage.

import { supabase } from './supabaseClient';
import { apiProxy } from './http/AuthenticatedApiProxy';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

/**
 * Get the current authenticated user's ID for server-side key resolution.
 */
async function getCurrentUserId() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id || null;
  } catch {
    return null;
  }
}

/**
 * Check key status from the server (encrypted storage).
 */
export async function getKeyStatus() {
  const userId = await getCurrentUserId();
  if (!userId) return { any: false, serverKey: false };

  try {
    const data = await apiProxy.get<{hasKey: boolean, lastFour?: string}>(`${API_BASE}/api/keys/status/${userId}`);
    return { any: data.hasKey, serverKey: data.hasKey, lastFour: data.lastFour };
  } catch {
    return { any: false, serverKey: false };
  }
}

/**
 * Check if a project-scoped key exists.
 */
export async function getProjectKeyStatus(sequenceId: string) {
  const userId = await getCurrentUserId();
  if (!userId || !sequenceId) return { hasKey: false };

  try {
    const data = await apiProxy.get<{hasKey: boolean, lastFour?: string}>(`${API_BASE}/api/keys/project-status/${userId}/${sequenceId}`);
    return { hasKey: data.hasKey, lastFour: data.lastFour };
  } catch {
    return { hasKey: false };
  }
}

/**
 * High-level pre-check for key availability.
 */
interface KeyCheckResult {
  any: boolean;
  project: { hasKey: boolean; lastFour?: string };
  global: { any: boolean; lastFour?: string };
  activeSource: 'none' | 'project' | 'global';
}

export async function checkKeyAvailability(sequenceId: string): Promise<KeyCheckResult> {
  const [projectStatus, globalStatus] = await Promise.all([
    getProjectKeyStatus(sequenceId),
    getKeyStatus()
  ]);

  return {
    any: projectStatus.hasKey || globalStatus.any,
    project: projectStatus,
    global: globalStatus,
    activeSource: projectStatus.hasKey ? 'project' : globalStatus.any ? 'global' : 'none'
  };
}

/**
 * Call the local Node.js Backend Server API.
 * The server resolves the API key from encrypted storage using the userId.
 * @param {string} userTask - The overarching project goal / prompt
 * @param {object} agent - Current Node Information (phase, name, etc.)
 * @param {string} neuralContext - Previous phase data (Neural Bridge)
 * @returns {Promise<{content: string, ui: string}>}
 */
export async function callLLM(userTask: any, agent: any, neuralContext: any = '', attachment: any = null, useDefaultKey: boolean = false, requestedModel?: string, signal?: AbortSignal) {
  const userId = await getCurrentUserId();

  // Build enriched task with attachment
  let enrichedTask = userTask;
  if (attachment?.content) {
    enrichedTask += `\n\n--- ATTACHED FILE: ${attachment.name} ---\n${attachment.content.substring(0, 8000)}\n--- END ATTACHMENT ---`;
  }

  if (!userId) {
    return {
      content: 'Not authenticated. Please sign in to use the engine.',
      ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(255,255,255,0.08);color:#fff;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#A259FF,#46B1FF);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:20px;box-shadow:0 8px 32px rgba(162,89,255,0.3)">⚡</div>
          <h2 style="font-size:24px;font-weight:800;margin:0;letter-spacing:-0.5px">Authentication Required</h2>
        </div>
        <p style="color:#8b949e;font-size:15px;line-height:1.7;margin:0">Please sign in and add your API key in Profile settings.</p>
      </div>`,
    };
  }

  const API_URL = `${API_BASE}/api/llm`;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const sequenceId = localStorage.getItem('active_sequence_id');
      const finalModel = requestedModel || localStorage.getItem('agentic_model') || undefined;
      
      const result = await apiProxy.post<any>(API_URL, {
        userTask: enrichedTask,
        agent,
        neuralContext,
        userId, 
        sequenceId,
        requestedModel: finalModel,
        useDefaultKey,
      }, { signal });

      return result;
    } catch (err: any) {
      const status = err?.status;
      // Retry on Rate Limit or Server Overload
      if ((status === 429 || status === 503 || status === 502) && attempt < maxRetries) {
        attempt++;
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`[Frontend] Provider overload or rate limit (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      // If the server reports a key error, dispatch a global event with type classification
      if (err?._keyError) {
        window.dispatchEvent(new CustomEvent('agentic:key-error', {
          detail: { 
            type: err._errorType || 'INVALID_KEY',
            message: err.content 
          },
        }));
      }

      // If the server reports a token / context-limit error, dispatch a dedicated event
      if (err?._tokenError) {
        window.dispatchEvent(new CustomEvent('agentic:token-limit', {
          detail: {
            model: err._model || 'Unknown Model',
            provider: err._provider || 'Unknown Provider',
            message: err.content || 'The model context window was exceeded.',
          },
        }));
      }

      if (err && (err.ui || err.content)) {
        return err;
      }

      if (attempt < maxRetries && err.message?.includes('fetch')) {
        attempt++;
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`[Frontend] Network error (Attempt ${attempt}/${maxRetries}). Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      console.error('[Frontend] Failed to communicate with backend:', err);
      return {
        content: `Error reaching backend: ${err.message || err}`,
        ui: `<div style="padding:32px;font-family:Outfit,sans-serif;background:rgba(10,10,15,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:24px;border:1px solid rgba(239,68,68,0.25)">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
              <h3 style="color:#ef4444;font-size:20px;font-weight:700;margin:0;font-family:Syne,sans-serif">Frontend/Backend Conductor Error</h3>
            </div>
            <p style="color:#8b949e;font-size:14px;line-height:1.6;margin:0 0 16px 0">Make sure your Node.js server (npm run dev:server) is running on port 3001.</p>
          </div>`
      };
    }
  }
}
