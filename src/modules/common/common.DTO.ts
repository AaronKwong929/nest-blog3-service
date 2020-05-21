import { IndexDTO } from './../../types/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommonArticleIndexDTO extends IndexDTO {
    @ApiProperty({
        description: `分类`,
        required: false,
        default: null
    })
    type?: string;

    @ApiProperty({
        description: `标签`,
        required: false,
        default: null
    })
    tag?: string;
}

// 获取评论列表 DTO
export class CommentContentDTO extends IndexDTO {
    @ApiProperty({
        description: `文章ID`,
        required: true,
        default: 1,
        type: String
    })
    @IsString()
    articleId!: string;
}

// 发送评论 DTO
export class SendCommentDTO {
    @ApiProperty({
        description: `文章ID`,
        required: true,
        default: ``
    })
    @IsString()
    articleId!: string;

    @ApiProperty({
        description: `评论人`,
        required: true,
        default: `John Doe`
    })
    @IsString()
    user!: string;

    @ApiProperty({
        description: `内容`,
        required: true,
        default: ``
    })
    @IsString()
    content!: string;
}
