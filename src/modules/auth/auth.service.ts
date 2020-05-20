import { eventLog } from './../../helpers/eventTrack';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminDTO } from './auth.DTO';
import { ResponseDTO } from 'src/helpers/types';
import { AdminModel } from 'src/models/admin.model';
import { createSuccessResponse } from 'src/helpers/createSuccessResponse';
import { createFailResponse } from 'src/helpers/createFailResponse';
import { comparePassword } from 'src/helpers/encryption';
import { JWT } from 'src/auth/auth.jwt';

@Injectable()
export class AuthService {
    // 添加管理员
    async addAdmin(adminDTO: AdminDTO): Promise<ResponseDTO> {
        try {
            
            const { account } = adminDTO;
            const admin = await AdminModel.find({ account });
            
            if (admin && admin.length > 0) {
                throw new Error();
            }
            await AdminModel.create(adminDTO);
            await eventLog(1000, 0);
            return createSuccessResponse({ message: `创建管理员成功` });
        } catch (e) {
            await eventLog(1000, -1);
            return createFailResponse(e, `用户已存在`);
        }
    }

    // 管理员登录
    async login(adminDTO: AdminDTO): Promise<ResponseDTO> {
        const { account, password } = adminDTO,
            admin = await AdminModel.findOne({ account });
        if (!admin) {
            await eventLog(1001, -1);
            throw new UnauthorizedException({ message: `用户不存在` });
        }
        const compareResult = await comparePassword(password, admin.password);
        if (!compareResult) {
            await eventLog(1001, -1);
            throw new UnauthorizedException({ message: `账号或密码错误` });
        }
        const token = JWT.sign({ account: admin.account });
        await eventLog(1001, 0);
        return createSuccessResponse({ token, message: `登陆成功` });
    }

    // 管理员修改密码
    async changePassword(adminDTO: AdminDTO): Promise<ResponseDTO> {
        const { account, password } = adminDTO;
        try {
            const admin = await AdminModel.findOne({ account });
            admin.password = password;
            await admin.save();
            await eventLog(1002, 0);
            return createSuccessResponse({ message: `修改密码成功` });
        } catch (e) {
            await eventLog(1002, -1);
            return createFailResponse(e, `修改密码失败`);
        }
    }

    // 获取管理员列表
    async getAdminIndex(): Promise<ResponseDTO> {
        try {
            const totalCount = await AdminModel.countDocuments(),
                resultList = await AdminModel.find()
                    .select([`account`, `createdAt`, `updatedAt`])
                    .sort({ updatedAt: 1 });
            return createSuccessResponse({ totalCount, resultList });
        } catch (e) {
            return createFailResponse(e, `获取管理员列表失败`);
        }
    }

    // 删除管理员
    async deleteAdmin(adminId: string): Promise<ResponseDTO> {
        try {
            await AdminModel.findByIdAndDelete(adminId);
            return createSuccessResponse({ message: `删除成功` });
        } catch (e) {
            return createFailResponse(e, `删除失败`);
        }
    }
}
