import { responseDTO } from './index';
interface Data {
    errorMessage?: string;
    error?: any;
}

export const createFailResponse = (data?: Data): responseDTO => {
    return {
        status: -1,
        message: `操作失败`,
        data: data ? data : {}
    };
};
