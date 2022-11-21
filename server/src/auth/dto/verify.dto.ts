import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class VerifyDto {
    @ApiProperty({ default: 'example@examxple.ru', required: true })
    @IsNotEmpty()
    email: string;
    @ApiProperty({ required: false, description: "Обновление ключа" })
    @IsOptional()
    update?: Boolean;
    @ApiProperty({ default: 123456, required: false, description: "Ввод ключа для верификации" })
    @IsOptional()
    code?: Number;
}