import { adminSalt, memberSalt } from './../configs/password';
import crypto = require('crypto');

const encrypt = (pwd: string, salt: string): string => {
    return crypto
        .createHmac(`sha256`, salt)
        .update(pwd)
        .digest(`hex`);
};

// 重载加密方法
export function encryptPassword(password: string): string;
export function encryptPassword(password: string, type: string): string;
export function encryptPassword(password: string, type?: string): string {
    if (typeof type === 'undefined') {
        return encrypt(password, adminSalt);
    } else {
        if (type === `admin`) {
            return encrypt(password, adminSalt);
        } else if (type === `member`) {
            return encrypt(password, memberSalt);
        }
    }
}

// 重载比对方法
export function comparePassword(pwd1: string, pwd2: string): boolean;
export function comparePassword(
    pwd1: string,
    pwd2: string,
    type: string
): boolean;
export function comparePassword(
    pwd1: string,
    pwd2: string,
    type?: string
): boolean {
    if (typeof type === 'undefined') {
        const target = encryptPassword(pwd1);
        return target === pwd2;
    } else {
        if (type === `admin`) {
            const target = encryptPassword(pwd1);
            return target === pwd2;
        } else if (type === `member`) {
            const target = encryptPassword(pwd1, `member`);
            return target === pwd2;
        }
    }
}
