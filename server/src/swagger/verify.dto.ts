import {ApiProperty} from "@nestjs/swagger";

export class VerifySwaggerDto {
    @ApiProperty({ default: '6366bb3df98b39252a8ace86' })
    _id: string;
    @ApiProperty({ default: 'example@examxple.ru' })
    email: string;
    @ApiProperty({ default: '2022-11-05T19:40:37.903Z' })
    createdAt: Date;
    @ApiProperty({ default: false })
    newCode: Boolean;
}