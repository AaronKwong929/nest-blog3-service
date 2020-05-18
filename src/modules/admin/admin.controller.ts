import {
    AdminDTO,
    ArticleIndexDTO,
    ArticleDTO,
    CommentIndexDTO,
    CommentDTO,
    StatusDTO
} from './admin.DTO';
import { AdminService } from './admin.service';
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Query,
    Put,
    Delete
} from '@nestjs/common';
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
    getArticleIndex(@Query() articleDTO: ArticleIndexDTO): any {
        return this.adminService.getArticleIndex(articleDTO);
    }

    // 新建文章
    @Post(`article`)
    @ApiOperation({ summary: `新建文章` })
    addArticle(): any {
        return this.adminService.addArticle();
    }

    // 修改文章
    @Put(`article`)
    @ApiOperation({ summary: `修改文章` })
    updateArticle(@Body() articleDTO: ArticleDTO): any {
        return this.adminService.updateArticle(articleDTO);
    }

    // 删除文章
    @Delete(`article`)
    @ApiOperation({ summary: `删除文章` })
    deleteArticle(@Query() id: string): any {
        return this.adminService.deleteArticle(id);
    }

    // 获取文章详情
    @Get('article/:id')
    @ApiOperation({ summary: `获取文章详情` })
    getArticleDetails(@Param(`id`) id: string): any {
        return this.adminService.getArticleDetails(id);
    }

    // 获取评论
    @Get(`comment`)
    @ApiOperation({ summary: `获取评论列表` })
    getCommentIndex(@Query() commentIndexDTO: CommentIndexDTO): any {
        return this.adminService.getCommentIndex(commentIndexDTO);
    }

    // 展示 / 隐藏评论
    @Post(`comment`)
    @ApiOperation({ summary: `展示 / 隐藏评论` })
    changeCommentStatus(@Body() commentDTO: CommentDTO): any {
        return this.adminService.changeCommentStatus(commentDTO);
    }

    // 删除评论
    @Delete(`comment`)
    @ApiOperation({ summary: `展示 / 隐藏评论` })
    deleteComment(@Query(`commentId`) commentId: string): any {
        return this.adminService.deleteComment(commentId);
    }

    // 获取动态
    @Get(`status`)
    @ApiOperation({ summary: `获取动态列表` })
    getStatus(@Query(`pageIndex`) pageIndex: number): any {
        return this.adminService.getStatus(pageIndex);
    }

    // 创建动态
    @Post(`status`)
    @ApiOperation({ summary: `创建动态` })
    addStatus(@Body() statusDTO: StatusDTO): any {
        return this.adminService.addStatus(statusDTO);
    }

    // 删除动态
    @Delete(`status`)
    @ApiOperation({ summary: `删除动态` })
    deleteStatus(@Query(`statusId`) statusId: string): any {
        return this, this.adminService.deleteStatus(statusId);
    }
}
