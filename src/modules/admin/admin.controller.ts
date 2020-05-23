import { AdminAuthGuard } from '../../auth/auth.admin.guard';
import {
    ArticleIndexDTO,
    ArticleDTO,
    ArticleDetailsDTO,
    CommentDTO,
    CommentIndexDTO,
    StatusDTO,
    EventTrackDTO
} from './admin.DTO';
import { AdminService } from './admin.service';
import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth('authorization')
@ApiTags('管理模块')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    // 获取文章列表
    @Post('/article/index')
    @ApiOperation({ summary: `获取文章列表` })
    getArticleIndex(@Body() articleDTO: ArticleIndexDTO): any {
        return this.adminService.getArticleIndex(articleDTO);
    }
    // 新建文章
    @Post(`article`)
    @ApiOperation({ summary: `新建文章` })
    addArticle(): any {
        return this.adminService.addArticle();
    }
    // 修改文章
    @Put(`draft`)
    @ApiOperation({ summary: `修改文章` })
    updateArticle(@Body() articleDetailsDTO: ArticleDetailsDTO): any {
        return this.adminService.updateArticle(articleDetailsDTO);
    }
    // 发布 / 撤回文章
    @Put(`article/status`)
    @ApiOperation({ summary: `发布 / 撤回文章` })
    changeArticleStatus(@Body() articleDTO: ArticleDTO): any {
        return this.adminService.changeArticleStatus(articleDTO);
    }
    // 删除文章
    @Delete(`article`)
    @ApiOperation({ summary: `删除文章` })
    deleteArticle(@Query('articleId') articleId: string): any {
        return this.adminService.deleteArticle(articleId);
    }
    // 获取文章详情
    @Get('article')
    @ApiOperation({ summary: `获取文章详情` })
    getArticleDetails(@Query(`articleId`) articleId: string): any {
        return this.adminService.getArticleDetails(articleId);
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
    changeCommentStatus(@Body() commentDTO: CommentDTO): any {
        return this.adminService.changeCommentStatus(commentDTO);
    }
    // 删除评论
    @Delete(`comment`)
    @ApiOperation({ summary: `删除评论` })
    deleteComment(@Query(`commentId`) commentId: string): any {
        return this.adminService.deleteComment(commentId);
    }
    // 获取动态
    @Post(`status`)
    @ApiOperation({ summary: `获取动态列表` })
    getStatus(@Body() eventTrackDTO: EventTrackDTO): any {
        return this.adminService.getStatus(eventTrackDTO);
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
    getEventLog(@Body() eventTrackDTO: EventTrackDTO): any {
        return this.adminService.getEventLog(eventTrackDTO);
    }
}
