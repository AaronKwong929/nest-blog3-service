import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export interface ResponseDTO {
    status: number;
    message: string;
    data?: any;
}

export type Role = `admin` | `member`;

export class CommonIndexDTO {
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

export class RoleDTO {
    @ApiProperty({
        description: `用户账号`,
        required: true,
        example: `member1`,
        type: String
    })
    @IsNotEmpty({ message: `请输入用户账号` })
    @IsString({ message: `账号必须为字符串` })
    account!: string;

    @ApiProperty({
        description: `管理员密码`,
        required: true,
        example: `123456`,
        type: String
    })
    @IsNotEmpty({ message: `请输入管理员密码` })
    @IsString({ message: `密码必须为字符串` })
    password!: string;
}
