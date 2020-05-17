import { comparePassword } from './../../helpers/encryption';
import { responseDTO } from './../../helpers/index';
import { ArticleModel } from './../../models/article.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import { AdminModel } from './../../models/admin.model';
import { AdminDTO, ArticleIndexDTO, ArticleDTO } from './admin.DTO';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminService {
    // 添加管理员
    async addAdmin(adminDTO: AdminDTO): Promise<responseDTO> {
        await AdminModel.create(adminDTO);
        return createSuccessResponse();
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
        let { pageSize, pageIndex, type, tag, published } = articleIndexDTO,
            conditions = { type, tag, published },
            query = {};
        // GET 请求带过来的参数类型会改变
        // pageIndex 和 pageSize的类型为 number | string， 再断言成string 进行parseInt
        // 只写 number 的话 ts推断成 number 不可以进行 parseInt
        pageSize = parseInt(pageSize as string);
        pageIndex = parseInt(pageIndex as string);
        Reflect.ownKeys(conditions).map(item => {
            conditions[item] && (query[item] = conditions[item]);
        });
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
    }
    // 获取文章详情
    async getArticleDetails(id: string): Promise<responseDTO> {
        const article = await ArticleModel.findById(id);
        return createSuccessResponse({ article });
    }
    // 新建文章
    async addArticle(): Promise<responseDTO> {
        const article = new ArticleModel();
        await article.save();
        return createSuccessResponse({ articleId: article._id });
    }
    // 修改文章
    async updateArticle(articleDTO: ArticleDTO): Promise<responseDTO> {
        console.log(articleDTO);
        return createSuccessResponse();
    }
    // 删除文章
    async deleteArticle(id: string): Promise<responseDTO> {
        await ArticleModel.findByIdAndDelete(id);
        return createSuccessResponse();
    }
}
