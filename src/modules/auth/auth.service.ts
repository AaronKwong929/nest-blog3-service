import { JWTMember } from './../../auth/auth.jwt';
import { eventLog } from './../../helpers/eventTrack';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminDTO, MemberDTO, MemberIndexDTO } from './auth.DTO';
import { ResponseDTO } from 'src/types';
import { AdminModel } from 'src/models/admin.model';
import { createSuccessResponse } from 'src/helpers/createSuccessResponse';
import { createFailResponse } from 'src/helpers/createFailResponse';
import { comparePassword } from 'src/helpers/encryption';
import { JWTAdmin } from 'src/auth/auth.jwt';
import { MemberModel } from 'src/models/member.model';

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
            throw new UnauthorizedException({ message: `管理员不存在` });
        }
        const compareResult = await comparePassword(password, admin.password);
        if (!compareResult) {
            await eventLog(1001, -1);
            throw new UnauthorizedException({ message: `账号或密码错误` });
        }
        const token = JWTAdmin.sign({ account: admin.account });
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
            await eventLog(1003, 0);
            return createSuccessResponse({ totalCount, resultList });
        } catch (e) {
            await eventLog(1003, -1);
            return createFailResponse(e, `获取管理员列表失败`);
        }
    }
    // 删除管理员
    async deleteAdmin(adminId: string): Promise<ResponseDTO> {
        try {
            await AdminModel.findByIdAndDelete(adminId);
            await eventLog(1004, 0);
            return createSuccessResponse({ message: `删除成功` });
        } catch (e) {
            await eventLog(1004, -1);
            return createFailResponse(e, `删除失败`);
        }
    }
    // 创建普通用户
    async addMember(memberDTO: MemberDTO): Promise<ResponseDTO> {
        try {
            const { account } = memberDTO;
            const member = await MemberModel.findOne({ account });
            if (member) {
                throw new Error();
            }
            await MemberModel.create(memberDTO);
            return createSuccessResponse({ message: `创建成功` });
        } catch (e) {
            return createFailResponse(e, `创建用户失败`);
        }
    }
    // 普通用户登录
    async memberLogin(memberDTO: MemberDTO): Promise<ResponseDTO> {
        const { account, password } = memberDTO,
            member = await MemberModel.findOne({ account });
        if (!member) throw new UnauthorizedException({ message: `用户不存在` });
        const compareResult = await comparePassword(
            password,
            member.password,
            `member`
        );
        if (!compareResult)
            throw new UnauthorizedException({ message: `账号或密码错误` });
        const token = JWTMember.sign({ account: member.account });
        return createSuccessResponse({ token, message: `登录成功` });
    }
    // 删除普通用户
    async deleteMember(memberId: string): Promise<ResponseDTO> {
        try {
            await MemberModel.findByIdAndDelete(memberId);
            return createSuccessResponse({ message: `删除普通用户成功` });
        } catch (e) {
            return createFailResponse(e, `删除普通用户失败`);
        }
    }
    // 修改普通用户密码
    async changeMemberPassword(memberDTO: MemberDTO): Promise<ResponseDTO> {
        try {
            const { account, password } = memberDTO,
                member = await MemberModel.findOne({ account });
            member.password = password;
            await member.save();
            return createSuccessResponse({ message: `修改成功` });
        } catch (e) {
            return createFailResponse(e, `修改普通用户密码失败`);
        }
    }
    // 获取普通用户列表
    async getMemberIndex(memberIndexDTO: MemberIndexDTO): Promise<ResponseDTO> {
        const { pageIndex, pageSize } = memberIndexDTO;
        try {
            const totalCount = await MemberModel.countDocuments(),
                resultList = await MemberModel.find()
                    .select([`account`, `updatedAt`])
                    .sort({ updatedAt: -1 })
                    .limit(pageSize)
                    .skip((pageIndex - 1) * pageSize);
            return createSuccessResponse({
                totalCount,
                resultList,
                message: `查询普通用户列表成功`
            });
        } catch (e) {
            return createFailResponse(e, `查询普通用户列表失败`);
        }
    }
}
