import { ResponseDTO } from '../types/index';
export const createFailResponse = (
    data: any = {},
    message = `No message available.`
): ResponseDTO => {
    data.message = message;
    return {
        status: -1,
        message: `操作失败`,
        data
    };
};
