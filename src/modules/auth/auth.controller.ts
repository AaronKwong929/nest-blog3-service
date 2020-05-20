import { AuthService } from './auth.service';
import { Controller, Body, Post, Get, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminDTO } from './auth.DTO';

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
}
