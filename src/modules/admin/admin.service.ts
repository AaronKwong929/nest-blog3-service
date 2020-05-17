import { comparePassword } from './../../helpers/encryption';
import { responseDTO } from './../../helpers/index';
import { createFailResponse } from './../../helpers/createFailResponse';
import { ArticleModel } from './../../models/article.model';
import { createSuccessResponse } from './../../helpers/createSuccessResponse';
import { AdminModel } from './../../models/admin.model';
import { AdminDTO } from './adminDTO';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    async addAdmin(adminDTO: AdminDTO): Promise<responseDTO> {
        await AdminModel.create(adminDTO);
        return createSuccessResponse();
    }

    async login(adminDTO: AdminDTO): Promise<responseDTO> {
        const { account, password } = adminDTO,
            admin = await AdminModel.findOne({ account }),
            compareResult = await comparePassword(password, admin.password);
        if (compareResult) {
            return createSuccessResponse();
        } else {
            return createFailResponse();
        }
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
