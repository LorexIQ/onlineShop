import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserSwaggerDto, UserTokenSwaggerDto, VerifySwaggerDto } from "../swagger";
import { SigninDto, SignupDto } from './dto';
import { AuthService } from "./auth.service";
import {VerifyDto} from "./dto/verify.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: HttpStatus.OK, type: UserSwaggerDto })
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя (Получение токена)'})
  @ApiBody({ type: SigninDto })
  @ApiResponse({ status: HttpStatus.OK, type: UserTokenSwaggerDto })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @ApiOperation({ summary: 'Отправление кода на верификацию аккаунта', description: 'Время действия кода: 5 минут. Время повторного запроса кода: 30 секунд.'})
  @ApiResponse({ status: HttpStatus.OK, type: VerifySwaggerDto })
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  verify(@Body() body: VerifyDto) {
    return this.authService.verify(body);
  }
}