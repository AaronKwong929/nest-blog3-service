import { AdminDTO } from './admin.DTO';
import { AdminService } from './admin.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('管理模块')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    // 创建管理员账号
    @Post('add')
    @ApiOperation({ summary: `添加管理员` })
    addAdmin(@Body() adminDTO: AdminDTO): any {
        return this.adminService.addAdmin(adminDTO);
    }

    // 管理员登录
    @Post(`login`)
    @ApiOperation({ summary: `管理员登录` })
    login(@Body() adminDTO: AdminDTO): any {
        return this.adminService.login(adminDTO);
    }
    
    // 获取文章列表
    @Get('article')
    @ApiOperation({ summary: `获取文章列表` })
    getArticleIndex(): any {
        return this.adminService.getArticleIndex();
    }

    // 获取文章详情
    @Get('article/:id')
    @ApiOperation({ summary: `获取文章详情` })
    getArticleDetails(@Param(`id`) id: string): any {
        return this.adminService.getArticleDetails(id);
    }
}
