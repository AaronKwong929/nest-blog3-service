import { CommonIndexDTO } from './../../types/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class ArticleIndexDTO extends CommonIndexDTO {
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
    _id?: string;

    @ApiProperty({
        description: `文章标题`,
        type: String,
        required: false
    })
    @IsString()
    title?: string;

    @ApiProperty({
        description: `分类`,
        type: String,
        required: false
    })
    @IsString()
    type?: string;

    @ApiProperty({
        description: `标签`,
        type: String,
        required: false
    })
    @IsString()
    tag?: string;

    @ApiProperty({
        description: `内容`,
        type: String,
        required: false
    })
    @IsString()
    content?: string;

    @ApiProperty({
        description: `状态`,
        type: Boolean,
        required: false
    })
    @IsBoolean()
    published?: boolean;
}

export class CommentIndexDTO extends CommonIndexDTO {
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
