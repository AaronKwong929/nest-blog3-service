import { AuthService } from './auth.service';
import {
    Controller,
    Body,
    Post,
    Get,
    Delete,
    Query,
    Put
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminDTO, MemberIndexDTO, MemberDTO } from './auth.DTO';

@Controller('auth')
@ApiTags('安全模块')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    // 创建管理员账号
    @Post('add')
    @ApiOperation({ summary: `添加管理员` })
    addAdmin(@Body() adminDTO: AdminDTO): any {
        return this.authService.addAdmin(adminDTO);
    }
    // 管理员登录
    @Post(`login`)
    @ApiOperation({ summary: `管理员登录` })
    login(@Body() adminDTO: AdminDTO): any {
        return this.authService.login(adminDTO);
    }
    // 管理员修改密码
    @Post(`adminChangePassword`)
    @ApiOperation({ summary: `管理员修改密码` })
    changePWD(@Body() adminDTO: AdminDTO): any {
        return this.authService.changePassword(adminDTO);
    }
    // 删除管理员
    @Delete(`admin`)
    @ApiOperation({ summary: `删除管理员` })
    deleteAdmin(@Query(`id`) adminId: string): any {
        return this.authService.deleteAdmin(adminId);
    }
    // 获取管理员列表
    @Get(`admin/index`)
    @ApiOperation({ summary: `获取管理员列表` })
    getAdminIndex(): any {
        return this.authService.getAdminIndex();
    }
    // 获取普通用户列表
    @Post(`member/index`)
    @ApiOperation({ summary: `获取普通用户列表` })
    getMemberIndex(@Body() memberIndexDTO: MemberIndexDTO): any {
        return this.authService.getMemberIndex(memberIndexDTO);
    }
    // 创建普通用户
    @Post(`member`)
    @ApiOperation({ summary: `创建普通用户` })
    addMember(@Body() memberDTO: MemberDTO): any {
        return this.authService.addMember(memberDTO);
    }
    // 修改普通用户密码
    @Put(`member`)
    @ApiOperation({ summary: `修改普通用户密码` })
    changeMemberPassword(@Body() memberDTO: MemberDTO): any {
        return this.authService.changeMemberPassword(memberDTO);
    }
    // 删除普通用户
    @Delete(`member`)
    @ApiOperation({ summary: `删除普通用户` })
    deleteMember(@Query(`memberId`) memberId: string): any {
        return this.authService.deleteMember(memberId);
    }
}
