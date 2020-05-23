import { eventLog } from './../../helpers/eventTrack';
import { StatusModel } from './../../models/status.model';
import { createFailResponse } from './../../helpers/createFailResponse';
import { CommentModel } from './../../models/comment.model';
import { ResponseDTO } from '../../types/index';
import { ArticleModel } from './../../models/article.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import {
    ArticleIndexDTO,
    ArticleDTO,
    ArticleDetailsDTO,
    CommentDTO,
    CommentIndexDTO,
    StatusDTO,
    EventTrackDTO
} from './admin.DTO';
import { Injectable, Query } from '@nestjs/common';
import { EventTrackModel } from 'src/models/eventTrack.model';

@Injectable()
export class AdminService {
    // 获取文章列表
    async getArticleIndex(
        articleIndexDTO: ArticleIndexDTO
    ): Promise<ResponseDTO> {
        const { pageSize, pageIndex, type, tag, published } = articleIndexDTO,
            conditions = { type, tag, published },
            query = {};
        // GET 请求带过来的参数类型会改变
        // pageIndex 和 pageSize的类型为 number | string， 再断言成string 进行parseInt
        // 只写 number 的话 ts推断成 number 不可以进行 parseInt
        Reflect.ownKeys(conditions).map(item => {
            conditions[item] && (query[item] = conditions[item]);
        });
        try {
            const totalCount = await ArticleModel.countDocuments(query),
                resultList = await ArticleModel.find(query)
                    .select([
                        '_id',
                        'updatedAt',
                        'title',
                        'type',
                        'tag',
                        'published'
                    ])
                    .sort({ updatedAt: -1 })
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            await eventLog(2001, 0);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `获取文章列表成功`
            });
        } catch (e) {
            await eventLog(2001, -1);
            return createFailResponse(e, `获取文章列表失败`);
        }
    }
    // 获取文章详情
    async getArticleDetails(
        @Query('articleId') articleId: string
    ): Promise<ResponseDTO> {
        try {
            const article = await ArticleModel.findById(articleId);
            await eventLog(2005, 0);
            return createSuccessResponse({
                article,
                message: `获取文章详情成功`
            });
        } catch (e) {
            await eventLog(2005, -1);
            return createFailResponse(e, `不存在该文章`);
        }
    }
    // 新建文章
    async addArticle(): Promise<ResponseDTO> {
        const article = new ArticleModel();
        try {
            await article.save();
            await eventLog(2004, 0);
            return createSuccessResponse({
                articleId: article._id,
                message: `新建文章成功`
            });
        } catch (e) {
            eventLog(2004, -1);
            return createFailResponse(e, `新建文章失败`);
        }
    }
    // 修改文章
    async updateArticle(articleDTO: ArticleDetailsDTO): Promise<ResponseDTO> {
        const updateItem: ArticleDetailsDTO = {};
        // published: false 会被过滤
        Reflect.ownKeys(articleDTO).map(item => {
            (articleDTO[item] || typeof articleDTO[item] === `boolean`) &&
                (updateItem[item] = articleDTO[item]);
        });
        const { articleId, ...others } = updateItem;
        try {
            const article = await ArticleModel.findById(articleId);
            for (const key in others) {
                article[key] = others[key];
            }
            await article.save();
            await eventLog(2006, 0);
            return createSuccessResponse({ message: `保存文章成功` });
        } catch (e) {
            await eventLog(2006, -1);
            return createFailResponse(e, `保存文章失败`);
        }
    }
    // 发布 / 撤回文章
    async changeArticleStatus(articleDTO: ArticleDTO): Promise<ResponseDTO> {
        const { articleId } = articleDTO;
        try {
            const article = await ArticleModel.findById(articleId);
            article.published = !article.published;
            await article.save();
            await eventLog(2003, 0);
            return createSuccessResponse({ message: `发布 / 撤回文章成功` });
        } catch (e) {
            await eventLog(2003, -1);
            return createFailResponse(e, `发布 / 撤回文章失败`);
        }
    }
    // 删除文章
    async deleteArticle(id: string): Promise<ResponseDTO> {
        try {
            await ArticleModel.findByIdAndDelete(id);
            await eventLog(2002, 0);
            return createSuccessResponse({ message: `删除文章成功` });
        } catch (e) {
            await eventLog(2002, -1);
            return createFailResponse(e, `删除文章失败`);
        }
    }
    // 获取评论列表
    async getCommentIndex(
        commentIndexDTO: CommentIndexDTO
    ): Promise<ResponseDTO> {
        const { pageIndex, pageSize, articleId } = commentIndexDTO;
        try {
            const totalCount = await CommentModel.countDocuments({ articleId }),
                resultList = await CommentModel.find({ articleId })
                    .select([
                        `_id`,
                        `user`,
                        `content`,
                        `published`,
                        `updatedAt`
                    ])
                    .sort({ updatedAt: -1 })
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            await eventLog(3001, 0);
            return createSuccessResponse({
                resultList,
                totalCount,
                message: `获取评论列表成功`
            });
        } catch (e) {
            await eventLog(3001, -1);
            return createFailResponse(e, `获取评论列表失败`);
        }
    }
    // 隐藏 / 显示评论
    async changeCommentStatus(commentDTO: CommentDTO): Promise<ResponseDTO> {
        const { commentId } = commentDTO;
        try {
            const comment = await CommentModel.findById(commentId);
            comment.published = !comment.published;
            await comment.save();
            await eventLog(3003, 0);
            return createSuccessResponse({ message: `显示/隐藏评论成功` });
        } catch (e) {
            await eventLog(3003, -1);
            return createFailResponse(e, `显示 / 隐藏评论失败`);
        }
    }
    // 删除评论
    async deleteComment(commentId: string): Promise<ResponseDTO> {
        try {
            await CommentModel.findByIdAndDelete(commentId);
            await eventLog(3002, 0);
            return createSuccessResponse({ message: `删除评论成功` });
        } catch (e) {
            await eventLog(3002, -1);
            return createFailResponse(e, `删除评论失败`);
        }
    }
    // 获取动态
    async getStatus(eventTrackDTO: EventTrackDTO): Promise<ResponseDTO> {
        const { pageIndex, pageSize } = eventTrackDTO;
        try {
            const totalCount = await StatusModel.countDocuments(),
                resultList = await StatusModel.find()
                    .sort({ updatedAt: -1 })
                    .select([`_id`, `updatedAt`, `content`])
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            await eventLog(4001, 0);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `获取动态列表成功`
            });
        } catch (e) {
            await eventLog(4001, -1);
            return createFailResponse(e, `获取动态列表失败`);
        }
    }
    // 创建动态
    async addStatus(statusDTO: StatusDTO): Promise<ResponseDTO> {
        const status = new StatusModel(statusDTO);
        try {
            await status.save();
            await eventLog(4002, 0);
            return createSuccessResponse({ message: `创建动态成功` });
        } catch (e) {
            await eventLog(4002, -1);
            return createFailResponse(e, `创建动态失败`);
        }
    }
    // 删除动态
    async deleteStatus(statusId: string): Promise<ResponseDTO> {
        try {
            await StatusModel.findByIdAndDelete(statusId);
            await eventLog(4003, 0);
            return createSuccessResponse({ message: `删除动态成功` });
        } catch (e) {
            await eventLog(4003, -1);
            return createFailResponse(e, `删除动态失败`);
        }
    }
    // 获取埋点日志
    async getEventLog(eventTrackDTO: EventTrackDTO): Promise<ResponseDTO> {
        const { pageSize, pageIndex } = eventTrackDTO;
        try {
            const totalCount = await EventTrackModel.countDocuments(),
                resultList = await EventTrackModel.find()
                    .select([`updatedAt`, `eventCode`, `eventStatus`])
                    .sort({ updatedAt: -1 })
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            await eventLog(9999, 0);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `获取埋点日志成功`
            });
        } catch (e) {
            await eventLog(9999, -1);
            return createFailResponse(e, `获取埋点日志失败`);
        }
    }
}
