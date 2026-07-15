import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { createServer } from 'http';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? '*' : corsOrigin.split(',').map(o => o.trim())
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === 'production';

// ── SUPABASE CLIENT ──────────────────────────────────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[Server] Supabase credentials missing! API Key storage may fail. Using placeholders to prevent crash.');
  if (IS_PROD) {
    console.error('[Server] CRITICAL: Supabase credentials (VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are missing in production! Set them in Vercel Environment Variables.');
  }
}
const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder-key');

// ── ENCRYPTION & KEY MANAGEMENT (AES-256-GCM) ──────────────────────
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'agentic-flow-default-secret-change-in-production!!';

if (ENCRYPTION_SECRET === 'agentic-flow-default-secret-change-in-production!!') {
  console.warn('[Server] WARNING: Using default ENCRYPTION_SECRET. Keys are not securely encrypted!');
  if (IS_PROD) {
    console.error('[Server] CRITICAL: ENCRYPTION_SECRET is not set in production. Set it in Vercel Environment Variables.');
  }
}

const DEFAULT_NVIDIA_KEY = process.env.VITE_NVIDIA_API_KEY || process.env.NVIDIA_API_KEY || '';

if (!DEFAULT_NVIDIA_KEY) {
  console.warn('[Server] Warning: VITE_NVIDIA_API_KEY is missing. Default fallback key will be empty.');
}

export function deriveKey(secret, salt) {
  return crypto.scryptSync(secret, salt, 32);
}

export function encryptKey(text) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = deriveKey(ENCRYPTION_SECRET, salt);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encrypted: `${salt}:${encrypted}`, iv: iv.toString('hex'), authTag };
}

export function decryptKey(encData) {
  let salt = 'agentic-flow-salt';
  let encryptedHex = encData.encrypted;

  if (encData.encrypted && encData.encrypted.includes(':')) {
    const parts = encData.encrypted.split(':');
    salt = parts[0];
    encryptedHex = parts[1];
  }

  const key = deriveKey(ENCRYPTION_SECRET, salt);
  const iv = Buffer.from(encData.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(encData.authTag, 'hex'));
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

async function getStoredKey(userId, projectId = 'global') {
  if (!userId) return null;
  const { data, error } = await supabase
    .from('user_keys')
    .select('*')
    .eq('user_id', userId)
    .eq('project_id', projectId)
    .single();
  if (error || !data) return null;
  return data;
}

async function saveStoredKey(userId, projectId, encryptedData, lastFour) {
  const { error } = await supabase
    .from('user_keys')
    .upsert({
      user_id: userId,
      project_id: projectId,
      encrypted: encryptedData.encrypted,
      iv: encryptedData.iv,
      auth_tag: encryptedData.authTag,
      last_four: lastFour,
      saved_at: new Date().toISOString()
    }, { onConflict: 'user_id, project_id' });
  if (error) throw new Error(error.message);
}

async function deleteStoredKey(userId, projectId = 'global') {
  const { error } = await supabase
    .from('user_keys')
    .delete()
    .eq('user_id', userId)
    .eq('project_id', projectId);
  if (error) throw new Error(error.message);
}

/**
 * Resolve the API key for a user.
 * Priority: project-stored encrypted key > global-stored encrypted key > fallback key from client.
 */
export async function resolveApiKey(userId, sequenceId, fallbackKey, useDefaultKey = false) {
  if (userId) {
    // 1. Try project-scoped key
    if (sequenceId) {
      const pData = await getStoredKey(userId, sequenceId);
      if (pData) {
        try {
          return decryptKey({ encrypted: pData.encrypted, iv: pData.iv, authTag: pData.auth_tag });
        } catch (err) { console.error('[Server] Project key decryption failed:', err.message); }
      }
    }

    // 2. Try global key
    const gData = await getStoredKey(userId, 'global');
    if (gData) {
      try {
        return decryptKey({ encrypted: gData.encrypted, iv: gData.iv, authTag: gData.auth_tag });
      } catch (err) { console.error('[Server] Global key decryption failed:', err.message); }
    }
  }
  if (useDefaultKey) {
    return DEFAULT_NVIDIA_KEY || null;
  }
  return fallbackKey || null;
}

// ── UNIVERSAL GATEWAY PROTOCOL ──────────────────────────────────────
function determineProvider(key, requestedModel) {
  let finalModel = requestedModel;

  if (key.startsWith('sk-or-')) {
    return { url: 'https://openrouter.ai/api/v1/chat/completions', defaultModel: finalModel || 'openrouter/auto' };
  } else if (key.startsWith('sk-ant-')) {
    if (finalModel && !finalModel.startsWith('claude-')) {
      finalModel = 'claude-3-5-sonnet-20240620';
    }
    return { url: 'https://api.anthropic.com/v1/messages', defaultModel: finalModel || 'claude-3-5-sonnet-20240620' };
  } else if (key.startsWith('gsk_')) {
    if (finalModel === 'groq-llama-3') {
      finalModel = 'llama-3.3-70b-versatile';
    } else if (finalModel && !finalModel.includes('llama') && !finalModel.includes('mixtral') && !finalModel.includes('gemma')) {
      finalModel = 'llama-3.3-70b-versatile';
    }
    return { url: 'https://api.groq.com/openai/v1/chat/completions', defaultModel: finalModel || 'llama-3.3-70b-versatile' };
  } else if (key.startsWith('xai-')) {
    return { url: 'https://api.x.ai/v1/chat/completions', defaultModel: finalModel || 'grok-beta' };
  } else if (key.startsWith('AIzaSy')) {
    if (finalModel && !finalModel.startsWith('gemini-')) {
      finalModel = 'gemini-2.0-flash';
    }
    return { url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', defaultModel: finalModel || 'gemini-2.0-flash' };
  } else if (key.startsWith('nvapi-')) {
    // If the model isn't a valid Nvidia model identifier, map it to a valid Nvidia model
    if (!finalModel || (!finalModel.startsWith('nvidia/') && !finalModel.startsWith('meta/') && !finalModel.startsWith('mistralai/') && !finalModel.startsWith('microsoft/'))) {
      finalModel = 'meta/llama-3.3-70b-instruct';
    }
    return { url: 'https://integrate.api.nvidia.com/v1/chat/completions', defaultModel: finalModel };
  } else if (key.startsWith('sk-')) {
    if (finalModel && !finalModel.startsWith('gpt-')) {
      finalModel = 'gpt-4o';
    }
    return { url: 'https://api.openai.com/v1/chat/completions', defaultModel: finalModel || 'gpt-4o' };
  }

  return { url: 'https://openrouter.ai/api/v1/chat/completions', defaultModel: finalModel || 'openrouter/auto' };
}

// ── FALLBACK KEY TRACKER ───────────────────────────────────────────
const FALLBACK_KEYS = (process.env.FALLBACK_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
const userFallbackTracker = new Map(); // userId -> sequenceId

// Auth middleware
// When DEV_AUTH_BYPASS=true (local dev where Supabase project keys may mismatch),
// skip JWT verification and read userId from the request body instead.
// In production, forcibly disable DEV_AUTH_BYPASS even if it was accidentally set.
// This prevents a fatal crash on Vercel when the local .env is accidentally deployed.
const DEV_AUTH_BYPASS = process.env.DEV_AUTH_BYPASS === 'true' && !IS_PROD;

if (process.env.DEV_AUTH_BYPASS === 'true' && IS_PROD) {
  console.warn('[Server] ⚠️  DEV_AUTH_BYPASS=true was set but IGNORED in production for security. JWT verification is active.');
} else if (DEV_AUTH_BYPASS) {
  console.warn('[Server] ⚠️  DEV_AUTH_BYPASS=true — JWT verification skipped. Do NOT use in production!');
}

async function authenticateToken(req, res, next) {
  // Dev bypass: skip JWT check, trust userId from request body/params
  if (DEV_AUTH_BYPASS) {
    const userId = req.body?.userId || req.params?.userId || 'dev-user';
    req.user = { id: userId };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal authentication error.' });
  }
}

// ── KEY MANAGEMENT ENDPOINTS ────────────────────────────────────────

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Save (or replace) an API key — encrypted at rest
app.post('/api/keys/save', authenticateToken, async (req, res) => {
  const { userId, apiKey } = req.body;
  if (!userId || !apiKey) {
    return res.status(400).json({ error: 'userId and apiKey are required.' });
  }

  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden: You cannot modify keys for another user.' });
  }

  try {
    const trimmed = apiKey.trim();
    const encryptedData = encryptKey(trimmed);
    const lastFour = trimmed.slice(-4);

    await saveStoredKey(userId, 'global', encryptedData, lastFour);
    console.log(`[Server] ✓ API key saved for user ${userId.substring(0, 8)}...`);
    res.json({ success: true, lastFour });
  } catch (err) {
    console.error('[Server] Failed to save key:', err.message);
    res.status(500).json({ error: 'Failed to encrypt and save the key.' });
  }
});

// Check if a key exists for a user (never returns the actual key)
app.get('/api/keys/status/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const entry = await getStoredKey(userId, 'global');
  if (!entry) return res.json({ hasKey: false });
  res.json({ hasKey: true, lastFour: entry.last_four || '****', savedAt: entry.saved_at });
});

app.get('/api/keys/project-status/:userId/:sequenceId', authenticateToken, async (req, res) => {
  const { userId, sequenceId } = req.params;
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const entry = await getStoredKey(userId, sequenceId);
  if (!entry) return res.json({ hasKey: false });
  res.json({ hasKey: true, lastFour: entry.last_four || '****' });
});

app.post('/api/keys/save-project', authenticateToken, async (req, res) => {
  const { userId, sequenceId, apiKey } = req.body;
  if (!userId || !sequenceId || !apiKey) return res.status(400).json({ error: 'Missing data' });
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const encrypted = encryptKey(apiKey);
    const lastFour = apiKey.slice(-4);
    await saveStoredKey(userId, sequenceId, encrypted, lastFour);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a stored key
app.delete('/api/keys/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await deleteStoredKey(userId, 'global');
    console.log(`[Server] ✗ API key deleted for user ${userId.substring(0, 8)}...`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/keys/project/:userId/:sequenceId', authenticateToken, async (req, res) => {
  const { userId, sequenceId } = req.params;
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    await deleteStoredKey(userId, sequenceId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify a stored key works by making a lightweight test call
app.post('/api/keys/verify', authenticateToken, async (req, res) => {
  const { userId, apiKey: explicitKey } = req.body;
  if (!userId && !explicitKey) return res.status(400).json({ error: 'userId or apiKey is required.' });
  if (userId && userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Use explicitKey if provided (for pre-save validation), otherwise fetch from DB
  const apiKey = explicitKey || await resolveApiKey(userId, null, null);
  if (!apiKey) return res.json({ valid: false, reason: 'No key stored.' });

  const { url, defaultModel } = determineProvider(apiKey, null);
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey.startsWith('sk-ant-')) {
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: defaultModel,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('[Verify Error] Status:', response.status, 'Response:', errorText);
      return res.json({ valid: false, statusCode: response.status, reason: `Provider Error (${response.status}): ${errorText.substring(0, 100)}` });
    }

    res.json({ valid: true, statusCode: response.status });
  } catch (err) {
    console.log('[Verify Exception]', err.message);
    res.json({ valid: false, reason: err.message });
  }
});

app.post('/api/models', authenticateToken, async (req, res) => {
  const { userId, apiKey: explicitKey } = req.body;
  if (!userId && !explicitKey) return res.status(400).json({ error: 'userId or apiKey is required.' });
  if (userId && userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const apiKey = explicitKey || await resolveApiKey(userId, null, null);
  if (!apiKey) return res.json({ models: [] });

  const { url } = determineProvider(apiKey, null);

  try {
    if (apiKey.startsWith('sk-ant-')) {
      return res.json({
        models: [
          { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' },
          { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
          { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' }
        ]
      });
    }
    if (apiKey.startsWith('AIzaSy')) {
      return res.json({
        models: [
          { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
          { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
          { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
          { id: 'gemini-2.0-pro-exp-02-05', name: 'Gemini 2.0 Pro Experimental' }
        ]
      });
    }

    const modelsUrl = url.replace('/chat/completions', '/models');

    const response = await fetch(modelsUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Provider returned ${response.status}`);

    const data = await response.json();
    let models = [];
    if (data && data.data && Array.isArray(data.data)) {
      models = data.data.map(m => ({ id: m.id, name: m.name || m.id }));
      models.sort((a, b) => a.id.localeCompare(b.id));
    }

    res.json({ models });
  } catch (err) {
    console.error('[Server] Failed to fetch models:', err.message);
    res.json({ models: [] });
  }
});

// ── LLM EXECUTION ENDPOINT ─────────────────────────────────────────

app.post('/api/llm', authenticateToken, async (req, res) => {
  const { userTask, agent, neuralContext, activeKey, userId, sequenceId, requestedModel, useDefaultKey } = req.body;

  // In dev bypass mode, userId comes from body directly (already set on req.user)
  if (!DEV_AUTH_BYPASS && userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  console.log(`[Server] Incoming request for agent: ${agent?.name || 'unknown'}, phase: ${agent?.phaseLabel || 'unknown'}`);

  // Resolve key: project > global > client-provided
  const resolvedKey = await resolveApiKey(userId, sequenceId, activeKey, useDefaultKey);

  if (!resolvedKey) {
    return res.status(401).json({
      _errorType: 'NO_KEY',
      content: 'No API key configured. Please add a key for this project or globally.',
      ui: null,
    });
  }

  const { url, defaultModel } = determineProvider(resolvedKey, requestedModel);
  console.log(`[Server] Routing to provider: ${url} with model: ${defaultModel}`);

  // ── NODE EXECUTION & DELIVERY (DOUBLE DIAMOND PROTOCOL) ─────────
  let productSpec = "Provide deep expert analysis and structured technical output. Avoid placeholders.";
  const phaseTitle = (agent.phaseLabel || agent.categoryName || '').toUpperCase();

  if (phaseTitle.includes('DISCOVER') || phaseTitle.includes('RESEARCH')) {
    productSpec = `* Phase: [DISCOVER] - Research & Exploration
* Deliverable: Deep-dive market sentiment analysis, competitor feature mapping, and user persona profiling. 
* Context: Search for real-world trends. Create a sophisticated comparison matrix in the UI.`;
  } else if (phaseTitle.includes('DEFINE') || phaseTitle.includes('ARCHITECTURE')) {
    productSpec = `* Phase: [DEFINE] - Synthesis & Technical Strategy
* Deliverable: Comprehensive system architecture, data flow diagrams (Mermaid.js), and technical specifications. 
* Context: Define actual technical stacks and integration logic. Include Mermaid syntax.`;
  } else if (phaseTitle.includes('DEVELOP') || phaseTitle.includes('BUILD')) {
    productSpec = `* Phase: [DEVELOP] - Ideation & Prototype Creation
* Deliverable: Production-ready Tailwind CSS code, React component structures, or complex logic handlers. 
* Context: Write actual functional code blocks. Deliver extreme technical depth.`;
  } else if (phaseTitle.includes('DELIVER') || phaseTitle.includes('DEPLOY')) {
    productSpec = `* Phase: [DELIVER] - Finalization & Deployment Plan
* Deliverable: Deployment manifest, CI/CD pipeline strategy, and final Project Summary for stakeholders. 
* Context: Provide actual cloud deployment steps (AWS/Vercel/GCP) based on the architecture.`;
  }

  const systemPrompt = `You are a specialized worker in the "Agentic Flow" Engine.
CORE MISSION: Transform visual nodes into functional workers that deliver high-fidelity products.
Tone: Professional, futuristic, and efficient. Start your analysis with "[System Initialized: ${agent.name || 'Component'} Sequence]".

YOUR DIRECTIVE:
${productSpec}

${neuralContext ? `PREVIOUS NEURAL BRIDGE DATA:\n${neuralContext}\n\nBuild upon this previous context.` : ''}

RESPONSE FORMAT — Return a valid JSON object with exactly two keys:
{
  "content": "Your complete text output based on the Node Deliverable Spec. Include status like [Sequence Complete] at the end.",
  "ui": "A self-contained HTML component that renders your output beautifully. Use ONLY valid HTML tags with inline styles. DO NOT USE MARKDOWN. NO **bold**, NO ## headers. Use <strong>, <h1>, <ul>, etc.
         Midnight Luxe Design System:
         - Backgrounds: Deep black (#000000) or high-gloss navy-black (#0a0a0f). Use glassmorphism (backdrop-filter: blur(16px), background: rgba(255,255,255,0.02)).
         - Accents: Electric Purple (#A259FF), Azure Blue (#46B1FF), Lime Green (#DEF767).
         - Borders: 1px solid rgba(255,255,255,0.08).
         - Typography: Headers use 'Syne, sans-serif', body uses 'Outfit, sans-serif'.
         - Tables: Render any tables as beautiful HTML <table> elements."
}
CRITICAL: Return ONLY the raw JSON object. No markdown fences. NO Markdown syntax in the UI field.`;

  try {
    // Attempt strategy:
    //  Attempt 1 — primary key + requested model (large, slow model OK)
    //  Attempt 2 — primary key + lightweight fallback model (fast, avoids 60s+ waits)
    //  Then FALLBACK_KEYS if configured
    const attempts = [];
    attempts.push({ key: resolvedKey, isPrimary: true, attemptIndex: 1, overrideModel: null });
    // On retry, swap to a lighter NVIDIA model to avoid hammering the same slow endpoint
    const lightFallbackModel = resolvedKey.startsWith('nvapi-') ? 'meta/llama-3.1-8b-instruct'
      : resolvedKey.startsWith('gsk_') ? 'llama-3.1-8b-instant'
      : null;
    attempts.push({ key: resolvedKey, isPrimary: true, attemptIndex: 2, overrideModel: lightFallbackModel });

    if (FALLBACK_KEYS.length > 0) {
      const uniqueFallbacks = Array.from(new Set(FALLBACK_KEYS)).filter(k => k !== resolvedKey);
      // Shuffle fallback keys to distribute load
      uniqueFallbacks.sort(() => 0.5 - Math.random());
      uniqueFallbacks.slice(0, 2).forEach(k => {
        attempts.push({ key: k, isPrimary: false, attemptIndex: 1, overrideModel: null });
        attempts.push({ key: k, isPrimary: false, attemptIndex: 2, overrideModel: null });
      });
    }

    let response;
    let responseData;
    let finalModel = requestedModel;
    let finalUrl = '';
    let lastError;

    for (let i = 0; i < attempts.length; i++) {
      const currentAttempt = attempts[i];
      const currentKey = currentAttempt.key;

      // Add backoff/delay if retrying the same key
      if (i > 0 && attempts[i - 1].key === currentKey) {
        console.log(`[Server] Waiting 2s before retry attempt ${currentAttempt.attemptIndex} for the same key...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Use override model for retry attempts (lighter model to avoid repeated timeouts)
      const effectiveModel = currentAttempt.overrideModel || requestedModel;
      const { url, defaultModel } = determineProvider(currentKey, effectiveModel);
      finalModel = defaultModel;
      finalUrl = url;

      if (currentAttempt.overrideModel) {
        console.log(`[Server] [Attempt ${i + 1}/${attempts.length}] Retrying with lighter model: ${defaultModel}`);
      } else {
        console.log(`[Server] [Attempt ${i + 1}/${attempts.length}] Routing to provider: ${url} with model: ${defaultModel}`);
      }

      // If it's a fallback attempt, verify user hasn't switched pipelines (prevent concurrency race)
      if (!currentAttempt.isPrimary) {
        const previousFallbackSequence = userFallbackTracker.get(userId);
        if (previousFallbackSequence && previousFallbackSequence !== sequenceId) {
          console.log(`[Server] Fallback DENIED on attempt ${i + 1}. User ${userId} switched pipelines.`);
          continue;
        }
        userFallbackTracker.set(userId, sequenceId);
      }

      // Attempt 1: 90s (large model needs time). Subsequent attempts: 45s (lighter model, faster).
      const SERVER_LLM_TIMEOUT = currentAttempt.attemptIndex === 1 ? 90000 : 45000;
      const upstreamController = new AbortController();
      const upstreamTimer = setTimeout(() => {
        upstreamController.abort();
        console.warn(`[Server] Upstream LLM request timed out after ${SERVER_LLM_TIMEOUT / 1000}s on attempt ${i + 1}. Aborting.`);
      }, SERVER_LLM_TIMEOUT);

      try {
        response = await fetch(url, {
          method: 'POST',
          signal: upstreamController.signal,
          headers: {
            Authorization: `Bearer ${currentKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:5173',
            'X-Title': 'Agentic Flow Express Server',
          },
          body: JSON.stringify({
            model: defaultModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userTask || 'Begin execution sequence.' },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
          }),
        });

        clearTimeout(upstreamTimer);

        if (response.ok) {
          responseData = await response.json();
          break; // Success! Break out of retry loop
        } else {
          const errJson = await response.json().catch(() => ({}));
          const errMessage = errJson.error?.message || errJson.message || response.statusText || '';
          console.warn(`[Server] Attempt ${i + 1} failed with status ${response.status}: ${errMessage}`);
          lastError = {
            status: response.status,
            message: errMessage,
            url,
            defaultModel
          };
        }
      } catch (err) {
        clearTimeout(upstreamTimer);
        console.warn(`[Server] Attempt ${i + 1} encountered exception: ${err.message}`);
        lastError = {
          status: err.name === 'AbortError' ? 408 : 500,
          message: err.message || String(err),
          url,
          defaultModel
        };
      }
    }

  // If all attempts failed
  if (!responseData) {
    const status = lastError?.status || 500;
    const errMessage = lastError?.message || 'Unknown upstream failure';
    const providerUrl = lastError?.url || '';
    const modelUsed = lastError?.defaultModel || '';

    let errorType = 'PROVIDER_ERROR';
    if (status === 401 || status === 403) errorType = 'INVALID_KEY';
    if (status === 429) errorType = 'RATE_LIMIT';

    const tokenKeywords = [
      'context_length_exceeded', 'context length', 'maximum context',
      'token limit', 'insufficient_quota', 'quota exceeded',
      'too many tokens', 'max_tokens', 'string too long', 'input too long'
    ];
    const isTokenError = status === 413 || tokenKeywords.some(kw => errMessage.toLowerCase().includes(kw));
    if (isTokenError) errorType = 'TOKEN_LIMIT';

    console.log(`[Server] Error classified as: ${errorType} | Status: ${status} | Message: ${errMessage.substring(0, 80)}`);

    return res.status(status === 408 ? 504 : status).json({
      _errorType: errorType,
      _keyError: errorType !== 'TOKEN_LIMIT',
      _tokenError: errorType === 'TOKEN_LIMIT',
      _model: modelUsed,
      _provider: providerUrl.includes('groq') ? 'Groq' : providerUrl.includes('openrouter') ? 'OpenRouter' : providerUrl.includes('anthropic') ? 'Anthropic' : providerUrl.includes('googleapis') ? 'Google' : 'OpenAI',
      content: `Upstream Provider Error (${status}): ${errMessage}`,
      ui: null
    });
  }

  const data = responseData;
  let raw = data.choices?.[0]?.message?.content || '';
  console.log(`[Server] Raw LLM response length: ${raw.length} chars`);

    const formatMarkdownToHTML = (text) => {
      if (!text) return '';
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#A259FF">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h3 style="color:#fff;margin-top:16px;font-family:Syne,sans-serif">$1</h3>')
        .replace(/## (.*?)\n/g, '<h2 style="color:#fff;margin-top:20px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;font-family:Syne,sans-serif">$1</h2>')
        .replace(/# (.*?)\n/g, '<h1 style="color:#fff;margin-top:24px;font-family:Syne,sans-serif">$1</h1>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>');
    };

    let parsed;
    try {
      const firstBrace = raw.indexOf('{');
      const lastBrace = raw.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        let extractedRaw = raw.substring(firstBrace, lastBrace + 1);
        const cleanedRaw = extractedRaw.replace(/[\u0000-\u0019]+/g, "");
        parsed = JSON.parse(cleanedRaw);
        if (!parsed.content || !parsed.ui) throw new Error('Response missing required fields.');

        // If the LLM still returned markdown in the UI instead of HTML, format it beautifully
        if (!/<[a-z][\s\S]*>/i.test(parsed.ui) || parsed.ui.includes('**')) {
          let safeContent = parsed.ui.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          parsed.ui = `<div style="padding:32px; color:#e2e8f0; font-family:Outfit,sans-serif; line-height:1.7; font-size:15px; background:rgba(255,255,255,0.02); border-radius:24px; border:1px solid rgba(255,255,255,0.05);">${formatMarkdownToHTML(safeContent)}</div>`;
        }
      } else {
        throw new Error('No valid JSON object found in response.');
      }
    } catch (parseError) {
      console.warn(`[Server] Strict JSON parse failed for ${agent.name}. Salvaging content...`);
      let salvagedContent = raw;
      const contentRegex = /"content"\s*:\s*"?([\s\S]*?)"?(?:,\s*"ui"|\}$)/;
      const match = raw.match(contentRegex);
      if (match && match[1]) {
        salvagedContent = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      }

      let safeContent = salvagedContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let htmlContent = formatMarkdownToHTML(safeContent);

      parsed = {
        content: salvagedContent,
        ui: `<div style="padding:32px; color:#e2e8f0; font-family:Outfit,sans-serif; line-height:1.7; font-size:15px; background:rgba(255,255,255,0.02); border-radius:24px; border:1px solid rgba(255,255,255,0.05);">
               <div style="color:#DEF767; font-size:10px; font-weight:bold; margin-bottom:20px; text-transform:uppercase; letter-spacing:1px; border:1px solid rgba(222,247,103,0.3); padding:4px 8px; border-radius:6px; display:inline-block; background:rgba(222,247,103,0.1);">Auto-Recovered Mode</div>
               ${htmlContent}
             </div>`
      };
    }

    console.log(`[Server] Successfully processed LLM output for ${agent.name}`);
    res.json(parsed);
  } catch (error) {
    console.error(`[Server] LLM Fallback Triggered:`, error.message);
    res.status(500).json({
      _errorType: 'GATEWAY_ERROR',
      content: `[System Error] Sequence halted. ${error.message}`,
      ui: null,
    });
  }
});

app.post('/api/agent/stream', authenticateToken, async (req, res) => {
  const { userTask, agent, activeKey, userId, requestedModel, useDefaultKey } = req.body;

  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Resolve key: prefer server-stored encrypted key
  const resolvedKey = await resolveApiKey(userId, null, activeKey, useDefaultKey);

  if (!resolvedKey) {
    res.write('data: {"choices":[{"delta":{"content":"No API key detected. Add one in Profile → API Key Management.\\n"}}]}\n\n');
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  const { url, defaultModel } = determineProvider(resolvedKey, requestedModel);
  const systemPrompt = `You are a sub-processor computing the neural logic for: ${agent?.name}. Output a rapid chain-of-thought (3-4 technical sentences simulating log processing) detailing how you are evaluating this prompt. Provide raw streamable text with no formatting.`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resolvedKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: defaultModel,
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userTask || 'Begin execution log.' },
        ],
      }),
    });

    if (!response.ok) throw new Error('Stream failed upstream');

    for await (const chunk of response.body) {
      res.write(chunk);
    }
  } catch (err) {
    res.write(`data: {"choices":[{"delta":{"content":"\\n[STREAM FAILURE: ${err.message}]"}}]}\n\n`);
  }

  res.write('data: [DONE]\n\n');
  res.end();
});

// Use http.createServer to keep the process alive (Express 5 compat)
if (!process.env.VERCEL) {
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log(`[Agentic Flow] ✓ Backend server running on http://localhost:${PORT}`);
    console.log(`[Agentic Flow] ✓ Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Agentic Flow] ✓ Key Management: /api/keys/save, /api/keys/status/:userId`);
  });
}

export default app;
