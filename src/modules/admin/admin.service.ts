import { StatusModel } from './../../models/status.model';
import { createFailResponse } from './../../helpers/createFailResponse';
import { CommentModel } from './../../models/comment.model';
import { comparePassword } from './../../helpers/encryption';
import { responseDTO } from './../../helpers/index';
import { ArticleModel } from './../../models/article.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import { AdminModel } from './../../models/admin.model';
import {
    AdminDTO,
    ArticleIndexDTO,
    ArticleDTO,
    CommentIndexDTO,
    CommentDTO,
    StatusDTO
} from './admin.DTO';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminService {
    // 添加管理员
    async addAdmin(adminDTO: AdminDTO): Promise<responseDTO> {
        try {
            await AdminModel.create(adminDTO);
            return createSuccessResponse();
        } catch (e) {
            return createFailResponse(e, `用户已存在`);
        }
    }

    // 管理员登录
    async login(adminDTO: AdminDTO): Promise<responseDTO> {
        const { account, password } = adminDTO,
            admin = await AdminModel.findOne({ account });
        if (!admin) throw new UnauthorizedException({ message: `用户不存在` });
        const compareResult = await comparePassword(password, admin.password);
        if (!compareResult) {
            throw new UnauthorizedException({ message: `密码错误` });
        }
        return createSuccessResponse();
    }

    // 获取文章列表
    async getArticleIndex(
        articleIndexDTO: ArticleIndexDTO
    ): Promise<responseDTO> {
        let { pageSize, pageIndex, type, tag, published } = articleIndexDTO;
        const conditions = { type, tag, published },
            query = {};
        // GET 请求带过来的参数类型会改变
        // pageIndex 和 pageSize的类型为 number | string， 再断言成string 进行parseInt
        // 只写 number 的话 ts推断成 number 不可以进行 parseInt
        pageSize = parseInt(pageSize as string);
        pageIndex = parseInt(pageIndex as string);
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
            return createSuccessResponse({ totalCount, resultList });
        } catch (e) {
            return createFailResponse(e, `获取文章列表失败`);
        }
    }
    // 获取文章详情
    async getArticleDetails(id: string): Promise<responseDTO> {
        try {
            const article = await ArticleModel.findById(id);
            return createSuccessResponse({ article });
        } catch (e) {
            return createFailResponse(e, `不存在该文章`);
        }
    }
    // 新建文章
    async addArticle(): Promise<responseDTO> {
        const article = new ArticleModel();
        try {
            await article.save();
            return createSuccessResponse({ articleId: article._id });
        } catch (e) {
            return createFailResponse(e, `新建文章失败`);
        }
    }
    // 修改文章
    async updateArticle(articleDTO: ArticleDTO): Promise<responseDTO> {
        const updateItem: ArticleDTO = {};
        // published: false 会被过滤
        Reflect.ownKeys(articleDTO).map(item => {
            (articleDTO[item] || typeof articleDTO[item] === `boolean`) &&
                (updateItem[item] = articleDTO[item]);
        });
        const { _id, ...others } = updateItem;
        try {
            const article = await ArticleModel.findById(_id);
            for (let key in others) {
                article[key] = others[key];
            }
            await article.save();
            return createSuccessResponse();
        } catch (e) {
            return createFailResponse(e, `保存文章失败`);
        }
    }
    // 删除文章
    async deleteArticle(id: string): Promise<responseDTO> {
        try {
            await ArticleModel.findByIdAndDelete(id);
            return createSuccessResponse({ message: `删除文章成功` });
        } catch (e) {
            return createFailResponse(e, `删除文章失败`);
        }
    }

    // 获取评论列表
    async getCommentIndex(
        commentIndexDTO: CommentIndexDTO
    ): Promise<responseDTO> {
        let { pageIndex, pageSize, articleId } = commentIndexDTO;
        pageIndex = parseInt(pageIndex as string);
        pageSize = parseInt(pageSize as string);
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
            return createSuccessResponse({
                resultList,
                totalCount,
                message: `获取评论列表成功`
            });
        } catch (e) {
            return createFailResponse(e, `获取评论列表失败`);
        }
    }

    // 隐藏 / 显示评论
    async changeCommentStatus(commentDTO: CommentDTO): Promise<responseDTO> {
        const { commentId } = commentDTO;
        try {
            const comment = await CommentModel.findById({ commentId });
            comment.published = !comment.published;
            await comment.save();
            return createSuccessResponse();
        } catch (e) {
            return createFailResponse(e, `显示 / 隐藏评论失败`);
        }
    }

    // 删除评论
    async deleteComment(commentId: string): Promise<responseDTO> {
        try {
            await CommentModel.findByIdAndDelete(commentId);
            return createSuccessResponse({ message: `删除评论成功` });
        } catch (e) {
            return createFailResponse(e, `删除评论失败`);
        }
    }

    // 获取动态
    async getStatus(pageIndex: string | number): Promise<responseDTO> {
        const pageSize = 10;
        pageIndex = parseInt(pageIndex as string);
        try {
            const totalCount = await StatusModel.countDocuments(),
                resultList = await StatusModel.find()
                    .sort({ updatedAt: -1 })
                    .select([`_id`, `updatedAt`, `content`])
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `获取动态列表成功`
            });
        } catch (e) {
            return createFailResponse(e, `获取动态列表失败`);
        }
    }

    // 创建动态
    async addStatus(statusDTO: StatusDTO): Promise<responseDTO> {
        const status = new StatusModel(statusDTO);
        try {
            await status.save();
            return createSuccessResponse({ message: `创建动态成功` });
        } catch (e) {
            return createFailResponse(e, `创建动态失败`);
        }
    }

    // 删除动态
    async deleteStatus(statusId: string): Promise<responseDTO> {
        try {
            await StatusModel.findByIdAndDelete(statusId);
            return createSuccessResponse({ message: `删除动态成功` });
        } catch (e) {
            return createFailResponse(e, `删除动态失败`);
        }
    }
}
