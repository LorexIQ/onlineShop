import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PutUserDto {
    @ApiProperty({ default: 'Test' })
    @IsOptional()
    firstName?: string;
    @ApiProperty({ default: 'Testov' })
    @IsOptional()
    secondName?: string;
    @ApiProperty({ default: 'data:image/png;base64' })
    @IsOptional()
    image?: string;
    @ApiProperty({ default: 'Male' })
    @IsOptional()
    gender?: string;
}