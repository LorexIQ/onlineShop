import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUserDecorator } from './decorator';
import { User } from '../mongodb/user/user.schema';
import { UserService } from './user.service';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UserSwaggerDto } from "../swagger";
import { PutUserDto } from "./dto";

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получение списка всех польхователей' })
  @ApiResponse({ type: UserSwaggerDto, isArray: true })
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение информации авторизированного пользователя' })
  @ApiResponse({ type: UserSwaggerDto })
  @Get('me')
  getMe(@GetUserDecorator() user: User) {
    return user;
  }
  @ApiOperation({ summary: 'Обновление данных авторизированного пользователя' })
  @ApiBody({ type: PutUserDto })
  @Patch('me')
  updateMe(@GetUserDecorator('_id') id: string, @Body() body: PutUserDto) {
    return this.userService.updateMe(id, body);
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ type: UserSwaggerDto })
  @Get(':id')
  getIdUser(@Param() param: { id: string; }) {
    return this.userService.getIdUser(param.id);
  }

  @ApiOperation({ summary: 'Обновление данных пользователя по id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: PutUserDto })
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: PutUserDto) {
    return this.userService.updateUserId(id, body);
  }
}
