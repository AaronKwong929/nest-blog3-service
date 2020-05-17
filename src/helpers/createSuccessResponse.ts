import { responseDTO } from './index';
interface Data {
    resultList?: any[];
    totalCount?: number;
    pageIndex?: number;
    pageSize?: number;
    articleId?: string;
    article?: any;
}

export const createSuccessResponse = (data?: Data): responseDTO => {
    data = data ? data : {};
    return {
        status: 0,
        message: `操作成功`,
        data
    };
};
