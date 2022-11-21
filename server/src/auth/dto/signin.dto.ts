import { IsNotEmpty, Length } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SigninDto {
  @ApiProperty({ default: 'tested1', required: true })
  @IsNotEmpty()
  @Length(6, 20)
  username: string;
  @ApiProperty({ default: '12345678', required: true })
  @IsNotEmpty()
  @Length(8, 30)
  password: string;
}