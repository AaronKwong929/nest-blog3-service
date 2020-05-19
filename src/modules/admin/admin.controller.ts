import { AuthGuard } from '../../auth/auth.admin.guard';
import {
    ArticleIndexDTO,
    ArticleDTO,
    CommentIndexDTO,
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
    Delete,
    UseGuards,
    Patch
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(AuthGuard)
@ApiBearerAuth('authorization')
@ApiTags('管理模块')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    // 获取文章列表
    @Post('/article/index')
    @ApiOperation({ summary: `获取文章列表` })
    getArticleIndex(@Body() articleDTO: ArticleIndexDTO): any {
        console.log(`controller`)
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

    // 发布 / 撤回文章
    @Patch(`article`)
    @ApiOperation({ summary: `发布 / 撤回文章` })
    changeArticleStatus(@Body(`articleId`) articleId: string): any {
        return this.adminService.changeArticleStatus(articleId);
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
    @Post(`comment`)
    @ApiOperation({ summary: `获取评论列表` })
    getCommentIndex(@Body() commentIndexDTO: CommentIndexDTO): any {
        return this.adminService.getCommentIndex(commentIndexDTO);
    }

    // 展示 / 隐藏评论
    @Put(`comment`)
    @ApiOperation({ summary: `展示 / 隐藏评论` })
    changeCommentStatus(@Body() commentId: string): any {
        return this.adminService.changeCommentStatus(commentId);
    }

    // 删除评论
    @Delete(`comment`)
    @ApiOperation({ summary: `展示 / 隐藏评论` })
    deleteComment(@Query(`commentId`) commentId: string): any {
        return this.adminService.deleteComment(commentId);
    }

    // 获取动态
    @Post(`status`)
    @ApiOperation({ summary: `获取动态列表` })
    getStatus(@Body(`pageIndex`) pageIndex: number): any {
        return this.adminService.getStatus(pageIndex);
    }

    // 创建动态
    @Put(`status`)
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

    // 获取埋点日志
    @Post(`event`)
    @ApiOperation({ summary: `获取埋点日志` })
    getEventLog(@Body(`pageIndex`) pageIndex: number): any {
        return this.adminService.getEventLog(pageIndex);
    }
}
