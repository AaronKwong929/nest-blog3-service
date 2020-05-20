import { ResponseDTO } from '../types/index';
interface Data {
    resultList?: any[];
    totalCount?: number;
    pageIndex?: number;
    pageSize?: number;
    articleId?: string;
    article?: any;
    message?: string;
    token?: string;
}

export const createSuccessResponse = (data: Data = {}): ResponseDTO => {
    return {
        status: 0,
        message: `操作成功`,
        data
    };
};
