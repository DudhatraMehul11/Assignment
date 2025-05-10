import CryptoJS from 'crypto-js';

const SECRET = 'my-secret-key';

export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET).toString();
};

export const decryptPassword = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}