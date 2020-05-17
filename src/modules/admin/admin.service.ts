import { comparePassword } from './../../helpers/encryption';
import { responseDTO } from './../../helpers/index';
import { ArticleModel } from './../../models/article.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import { AdminModel } from './../../models/admin.model';
import { AdminDTO } from './admin.DTO';
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

    async getArticleIndex(): Promise<responseDTO> {
        const totalCount = await AdminModel.countDocuments(),
            resultList = await AdminModel.find();
        return createSuccessResponse({ totalCount, resultList });
    }

    async getArticleDetails(id: string): Promise<responseDTO> {
        const article = await ArticleModel.findById(id);
        return createSuccessResponse({ article });
    }
}
