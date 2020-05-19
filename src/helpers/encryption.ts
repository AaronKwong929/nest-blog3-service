import { salt } from './../configs/password';
import crypto = require('crypto');

export const encryptPassword = (password: string): string => {
    return crypto.createHmac(`sha256`, salt).update(password).digest('hex');
};

export const comparePassword = (pwd1: string, pwd2: string): boolean => {
    const target = encryptPassword(pwd1);
    return target === pwd2;
};
