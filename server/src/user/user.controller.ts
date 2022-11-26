import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import {GetRightDecorator, GetUserDecorator} from './decorator';
import { User } from '../mongodb/user/user.schema';
import { UserService } from './user.service';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UserSwaggerDto } from "../swagger";
import { PutUserDto } from "./dto";
import { PaginationDto } from "../pagination/dto/pagination.dto";

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Получение списка всех польхователей' })
  @ApiResponse({ type: UserSwaggerDto, isArray: true })
  @Get()
  getAllUsers(@GetRightDecorator(2) right: boolean, @Query() query: PaginationDto) {
    return this.userService.getAllUsers(query);
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
  updateUser(
      @GetRightDecorator(2) right: Boolean,
      @GetUserDecorator('role') role: Number,
      @Param('id') id: string,
      @Body() body: PutUserDto
  ) {
    return this.userService.updateUserId(id, body, role);
  }

  @Delete(':id')
  deleteUser(
      @GetRightDecorator(2) right: Boolean,
      @GetUserDecorator('role') role: Number,
      @Param('id') id: string
  ) {
    return this.userService.deleteUserId(id, role);
  }
}
