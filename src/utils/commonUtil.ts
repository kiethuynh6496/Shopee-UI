import CryptoJS from 'crypto-js';

// Encrypt with AES
export const encryptAES = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

// Decrypt width AES
export const decryptAES = (encryptedText: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const getCookie = (key: string) => {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};
