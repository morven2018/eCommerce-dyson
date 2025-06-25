import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkTokenValidity } from '../src/shared/api/commerce-tools/checkToken';

// Мок localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  },
};

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('btoa', (str: string) => Buffer.from(str).toString('base64'));
vi.stubGlobal('fetch', vi.fn());

vi.mock('../src/shared/config/commercetools', () => ({
  commercetoolsConfig: {
    authUrl: 'https://auth.example.com',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    projectKey: 'test-project',
  },
}));

describe('checkTokenValidity', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ active: true }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false when not token exists', async () => {
    const result = await checkTokenValidity();
    expect(result).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should return true for valid token', async () => {
    localStorage.setItem('authDysonToken', 'valid-token');

    const result = await checkTokenValidity();
    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return false for invalid token', async () => {
    localStorage.setItem('authDysonToken', 'invalid-token');
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ active: false }),
    });

    const result = await checkTokenValidity();
    expect(result).toBe(false);
  });

  it('should include correct authorization header', async () => {
    localStorage.setItem('authDysonToken', 'test-token');

    global.fetch = vi.fn().mockImplementation((url, options) => {
      const expectedAuth =
        'Basic ' +
        Buffer.from('test-client-id:test-client-secret').toString('base64');
      expect(options.headers.Authorization).toBe(expectedAuth);

      expect(url).toBe('https://auth.example.com/oauth/introspect');

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ active: true }),
      });
    });

    await checkTokenValidity();

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle network errors', async () => {
    localStorage.setItem('authDysonToken', 'test-token');
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const result = await checkTokenValidity();
    expect(result).toBe(false);
  });

  it('should send token in request body', async () => {
    const testToken = 'test-token-123';
    localStorage.setItem('authDysonToken', testToken);

    await checkTokenValidity();

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: `token=${encodeURIComponent(testToken)}`,
      })
    );
  });
});
