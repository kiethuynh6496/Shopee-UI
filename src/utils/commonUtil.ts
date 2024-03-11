import CryptoJS from 'crypto-js';
import { ShoppingCartItems } from 'models/shoppingCart/shoppingCartInfo';

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

export const changeItem = (
  array: ShoppingCartItems[],
  index: number,
  newValue: ShoppingCartItems
) => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

export const price = (inputNumber: number) => {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const clearLocalStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresAt');
};
