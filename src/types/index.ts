import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export interface ResponseDTO {
    status: number;
    message: string;
    data?: any;
}

export type Role = `admin` | `member`;

export abstract class IndexDTO {
    @ApiProperty({
        description: `当前页数`,
        required: true,
        example: 1,
        type: Number
    })
    @IsNumber()
    pageIndex!: number;

    @ApiProperty({
        description: `页大小`,
        required: true,
        example: 10,
        type: Number
    })
    @IsNumber()
    pageSize!: number;
}

export abstract class RoleDTO {
    @ApiProperty({
        description: `用户账号`,
        required: true,
        example: ``,
        type: String
    })
    account!: string;

    @ApiProperty({
        description: `密码`,
        required: true,
        example: ``,
        type: String
    })
    password!: string;
}
