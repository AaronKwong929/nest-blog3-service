import { IndexDTO } from './../../types/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ArticleIndexDTO extends IndexDTO {
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

    @ApiProperty({
        description: `状态`,
        required: false
    })
    published?: boolean;
}

export class ArticleDTO {
    @ApiProperty({
        description: `文章ID`,
        type: String,
        required: true
    })
    @IsString()
    articleId?: string;
}

export class ArticleDetailsDTO extends ArticleDTO {
    @ApiProperty({
        description: `文章标题`,
        type: String,
        required: false,
        default: `新建文章`
    })
    title?: string;

    @ApiProperty({
        description: `分类`,
        required: false
    })
    type?: string | null;

    @ApiProperty({
        description: `标签`,
        required: false
    })
    tag?: string | null;

    @ApiProperty({
        description: `内容`,
        type: String,
        required: false,
        default: ``
    })
    @IsString()
    content?: string;

    // @ApiProperty({
    //     description: `状态`,
        
    //     required: false
    // })
    // published?: boolean | null;
}

export class CommentDTO {
    @ApiProperty({
        description: `评论ID`,
        type: String,
        required: true
    })
    @IsString()
    commentId!: string;
}

export class CommentIndexDTO extends IndexDTO {
    @ApiProperty({
        description: `文章ID`,
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    articleId!: string;
}

export class StatusDTO {
    @ApiProperty({
        description: `动态内容`,
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    content!: string;
}

export class EventTrackDTO extends IndexDTO {}
