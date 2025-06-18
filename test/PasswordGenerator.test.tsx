import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import generatePassword from '../src/shared/utlis/password-generator';

describe('Password Generator', () => {
  const originalCrypto = globalThis.crypto;
  let callCount = 0;

  beforeEach(() => {
    callCount = 0;

    vi.stubGlobal('crypto', {
      getRandomValues: vi.fn((buffer: ArrayBufferView) => {
        const view = new Uint32Array(buffer.buffer);
        for (let i = 0; i < view.length; i++) {
          view[i] = i + 1 + callCount * 100;
        }
        callCount++;
        return buffer;
      }),
    });
  });

  afterEach(() => {
    vi.stubGlobal('crypto', originalCrypto);
  });

  describe('generatePassword', () => {
    it('should generate a password with 10 characters', () => {
      const password = generatePassword();
      expect(password.length).toBe(10);
    });

    it('should include at least one uppercase letter', () => {
      const password = generatePassword();
      expect(password).toMatch(/[A-Z]/);
    });

    it('should include at least two numbers', () => {
      const password = generatePassword();
      const numbers = password.match(/\d/g) ?? [];
      expect(numbers.length).toBeGreaterThanOrEqual(2);
    });

    it('should include at least one special symbol', () => {
      const password = generatePassword();
      expect(password).toMatch(/[!@#$%^&*]/);
    });

    it('should include at least six lowercase letters', () => {
      const password = generatePassword();
      const lowercase = password.match(/[a-z]/g) ?? [];
      expect(lowercase.length).toBeGreaterThanOrEqual(6);
    });

    it('should return different passwords on each call', () => {
      const password1 = generatePassword();
      const password2 = generatePassword();

      expect(password1).not.toEqual(password2);

      expect(password1.length).toBe(10);
      expect(password2.length).toBe(10);
    });
  });
});
