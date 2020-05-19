import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class ArticleIndexDTO {
    @ApiProperty({
        description: `当前页数`,
        default: 1,
        type: Number,
        example: 1,
        required: true
    })
    @IsNumber()
    pageIndex!: number;

    @ApiProperty({
        description: `页大小`,
        default: 10,
        type: Number,
        example: 10,
        required: true
    })
    @IsNumber()
    pageSize!: number;

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

export class CommentIndexDTO {
    @ApiProperty({
        description: `当前页数`,
        default: 1,
        type: Number,
        example: 1,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    pageIndex!: number;

    @ApiProperty({
        description: `页大小`,
        default: 10,
        type: Number,
        example: 10,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    pageSize!: number;

    @ApiProperty({
        description: `文章ID`,
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    articleId!: string;
}

// export class CommentDTO {
//     @ApiProperty({
//         description: `评论ID`,
//         type: String,
//         required: true
//     })
//     @IsNotEmpty()
//     @IsString()
//     commentId!: string;
// }

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
