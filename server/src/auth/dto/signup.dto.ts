import {IsEmail, IsNotEmpty, IsOptional, Length} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SignupDto {
  @ApiProperty({ default: 'tested1' })
  @IsNotEmpty()
  @Length(6, 20)
  username: string;
  @ApiProperty({ default: '12345678' })
  @IsNotEmpty()
  @Length(8, 30)
  password: string;
  @ApiProperty({ default: 'example@example.ru' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'Test', required: false })
  @IsOptional()
  firstName?: string;
  @ApiProperty({ default: 'Testev', required: false })
  @IsOptional()
  secondName?: string;
}