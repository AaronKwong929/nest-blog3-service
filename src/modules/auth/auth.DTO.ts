import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AdminDTO {
    @ApiProperty({
        description: `管理员账号`,
        required: true,
        example: `abc`,
        type: String
    })
    @IsNotEmpty({ message: `请输入管理员账号` })
    @IsString()
    account!: string;

    @ApiProperty({
        description: `管理员密码`,
        required: true,
        example: `123`,
        type: String
    })
    @IsNotEmpty({ message: `请输入管理员密码` })
    @IsString()
    password!: string;
}