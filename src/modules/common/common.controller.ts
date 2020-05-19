import { CommonService } from './common.service';
import { Controller, Post, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
    CommonArticleIndexDTO,
    SendCommentDTO,
    CommentContentDTO
} from './common.DTO';

@Controller('common')
@ApiTags(`开放模块`)
export class CommonController {
    constructor(private readonly commonService: CommonService) {}

    @Post(`article`)
    @ApiOperation({ summary: `获取文章列表` })
    getArticleIndex(@Body() commonArticleIndexDTO: CommonArticleIndexDTO): any {
        return this.commonService.getArticleIndex(commonArticleIndexDTO);
    }

    @Post(`details`)
    @ApiOperation({ summary: `获取文章详情` })
    getArticleDetails(@Body(`articleId`) articleId: string): any {
        return this.commonService.getArticleDetails(articleId);
    }

    @Post(`comment`)
    @ApiOperation({ summary: `获取评论列表` })
    getArticleComment(@Body() commentContentDTO: CommentContentDTO): any {
        return this.commonService.getArticleComment(commentContentDTO);
    }

    @Put(`comment`)
    @ApiOperation({ summary: `发送评论` })
    sendArticleComment(@Body() sendCommentDTO: SendCommentDTO): any {
        return this.commonService.sendArticleComment(sendCommentDTO);
    }

    @Post(`status`)
    @ApiOperation({ summary: `获取动态` })
    getStatus(): any {
        return this.commonService.getStatus();
    }
}
