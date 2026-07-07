import { describe, expect, it, beforeAll, vi } from 'vitest';
import crypto from 'crypto';

vi.mock('@supabase/supabase-js', () => {
  return {
    createClient: () => {
      return {
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              eq: () => ({
                single: async () => ({ data: null, error: new Error('Mocked DB error') })
              }),
              single: async () => ({ data: null, error: new Error('Mocked DB error') })
            }),
            single: async () => ({ data: null, error: new Error('Mocked DB error') })
          })
        })
      };
    }
  };
});

describe('Encryption & Decryption Security Tests', () => {
  let encryptKey: any;
  let decryptKey: any;

  beforeAll(async () => {
    // Inject mock credentials so module loading doesn't trigger fail-fast crash
    process.env.ENCRYPTION_SECRET = 'my-super-secret-test-encryption-key-which-is-safe';
    process.env.VITE_SUPABASE_URL = 'https://mock-supabase.supabase.co';
    process.env.VITE_SUPABASE_ANON_KEY = 'mock-anon-key';
    process.env.VITE_NVIDIA_API_KEY = 'nvapi-mock-default-nvidia-key-value';
    process.env.VERCEL = 'true';

    // @ts-expect-error server.js is a JS file without type definitions
    const serverModule = await import('../../server.js');
    encryptKey = serverModule.encryptKey;
    decryptKey = serverModule.decryptKey;
  });

  it('should encrypt a plaintext string and decrypt it back successfully', () => {
    const rawText = 'sk-ant-test-api-key-value';
    const encryptedData = encryptKey(rawText);

    expect(encryptedData).toHaveProperty('encrypted');
    expect(encryptedData).toHaveProperty('iv');
    expect(encryptedData).toHaveProperty('authTag');
    
    // Check that salt is prepended (contains ':')
    expect(encryptedData.encrypted).toContain(':');

    const decryptedText = decryptKey(encryptedData);
    expect(decryptedText).toBe(rawText);
  });

  it('should decrypt legacy keys encrypted with static salt (backward compatibility)', () => {
    const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET!;
    const key = crypto.scryptSync(ENCRYPTION_SECRET, 'agentic-flow-salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    const rawText = 'sk-or-v1-legacy-api-key';
    let encrypted = cipher.update(rawText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    const legacyPayload = {
      encrypted: encrypted, // no salt prefix
      iv: iv.toString('hex'),
      authTag: authTag
    };

    const decryptedText = decryptKey(legacyPayload);
    expect(decryptedText).toBe(rawText);
  });

  describe('Key Resolution & Default Nvidia Fallback Tests', () => {
    let resolveApiKey: any;

    beforeAll(async () => {
      // @ts-expect-error server.js has no types
      const serverModule = await import('../../server.js');
      resolveApiKey = serverModule.resolveApiKey;
    });

    it('should resolve to null if no key is stored and useDefaultKey is false', async () => {
      const resolved = await resolveApiKey('user-without-keys', null, null, false);
      expect(resolved).toBeNull();
    });

    it('should resolve to default nvidia key if no key is stored and useDefaultKey is true', async () => {
      const resolved = await resolveApiKey('user-without-keys', null, null, true);
      expect(resolved).toBe(process.env.VITE_NVIDIA_API_KEY);
    });
  });
});
