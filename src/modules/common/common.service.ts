import { ArticleModel } from './../../models/article.model';
import { StatusModel } from './../../models/status.model';
import { CommentModel } from './../../models/comment.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import { createFailResponse } from './../../helpers/createFailResponse';
import { ResponseDTO } from '../../helpers/types/index';
import {
    CommonArticleIndexDTO,
    SendCommentDTO,
    CommentContentDTO
} from './common.DTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    // 获取文章
    async getArticleIndex(
        commonArticleIndexDTO: CommonArticleIndexDTO
    ): Promise<ResponseDTO> {
        console.log(commonArticleIndexDTO);
        const published = true,
            { pageIndex, type, tag } = commonArticleIndexDTO,
            conditions = { type, tag, published },
            query = {};
        Reflect.ownKeys(conditions).forEach(key => {
            conditions[key] && (query[key] = conditions[key]);
        });
        const totalCount = await ArticleModel.countDocuments(query),
            resultList = await ArticleModel.find(query)
                .select([`updatedAt`, `title`, `tag`, `type`])
                .sort({ updatedAt: -1 })
                .limit(10)
                .skip((pageIndex - 1) * 10);
        return createSuccessResponse({
            message: `获取文章列表成功`,
            resultList,
            totalCount
        });
    }

    // 获取文章详情
    async getArticleDetails(articleId: string): Promise<ResponseDTO> {
        try {
            const article = await ArticleModel.findById(articleId);
            return createSuccessResponse({
                article,
                message: `获取文章内容成功`
            });
        } catch (e) {
            return createFailResponse(e, `不存在该文章`);
        }
    }
    // 获取评论
    async getArticleComment(
        commentContentDTO: CommentContentDTO
    ): Promise<ResponseDTO> {
        const { articleId, pageIndex } = commentContentDTO,
            pageSize = 5;
        try {
            const totalCount = await CommentModel.countDocuments({
                    articleId,
                    published: true
                }),
                resultList = await CommentModel.find({
                    articleId,
                    published: true
                })
                    .select([`updatedAt`, `user`, `content`])
                    .sort({ updatedAt: -1 })
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `获取评论列表成功`
            });
        } catch (e) {
            return createFailResponse(e, `获取评论列表失败`);
        }
    }
    // 发布评论
    async sendArticleComment(commentDTO: SendCommentDTO): Promise<ResponseDTO> {
        try {
            await CommentModel.create(commentDTO);
            return createSuccessResponse({ message: `发送评论成功` });
        } catch (e) {
            return createFailResponse(e, `发送评论失败`);
        }
    }
    // 获取状态
    async getStatus(): Promise<ResponseDTO> {
        try {
            const resultList = await StatusModel.find()
                .select([`content`, `updatedAt`])
                .sort({ updatedAt: -1 })
                .limit(5);
            return createSuccessResponse({
                resultList,
                message: `获取评论成功`
            });
        } catch (e) {
            return createFailResponse(e, `获取状态失败`);
        }
    }
}
