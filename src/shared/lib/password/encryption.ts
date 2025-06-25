import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_CTP_PROJECT_KEY ?? 'fallback-weak-key';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decryptData = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
