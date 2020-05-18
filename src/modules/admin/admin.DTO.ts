import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AdminDTO {
    @ApiProperty({
        description: `管理员账号`,
        required: true,
        example: `abc`,
        type: String
    })
    @IsNotEmpty({ message: `请输入管理员账号` })
    account!: string;

    @ApiProperty({
        description: `管理员密码`,
        required: true,
        example: `123`,
        type: String
    })
    @IsNotEmpty({ message: `请输入管理员密码` })
    password!: string;
}

export class ArticleIndexDTO {
    @ApiProperty({
        description: `当前页数`,
        default: 1,
        type: Number,
        example: 1,
        required: true
    })
    pageIndex!: number | string;

    @ApiProperty({
        description: `页大小`,
        default: 10,
        type: Number,
        example: 10,
        required: true
    })
    pageSize!: number | string;

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
    _id?: string;

    @ApiProperty({
        description: `文章标题`,
        type: String,
        required: false
    })
    title?: string;

    @ApiProperty({
        description: `分类`,
        type: String,
        required: false
    })
    type?: string;

    @ApiProperty({
        description: `标签`,
        type: String,
        required: false
    })
    tag?: string;

    @ApiProperty({
        description: `内容`,
        type: String,
        required: false
    })
    content?: string;

    @ApiProperty({
        description: `状态`,
        type: Boolean,
        required: false
    })
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
    pageIndex!: number | string;

    @ApiProperty({
        description: `页大小`,
        default: 10,
        type: Number,
        example: 10,
        required: true
    })
    pageSize!: number | string;

    @ApiProperty({
        description: `文章ID`,
        type: String,
        required: true
    })
    articleId!: string;
}
