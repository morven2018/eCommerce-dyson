import { decryptData } from '@shared/lib/password/encryption';

export const loadPassword = (): string => {
  const encrypted = localStorage.getItem('password');
  return encrypted ? decryptData(encrypted) : '';
};
