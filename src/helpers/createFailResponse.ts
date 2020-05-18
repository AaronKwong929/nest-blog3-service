import { responseDTO } from './index';

export const createFailResponse = (
    data: any = {},
    message: string = `No message available.`
): responseDTO => {
    data[message] = message;
    return {
        status: -1,
        message: `操作失败`,
        data
    };
};
