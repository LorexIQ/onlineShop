import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../auth/guard";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SellerService} from "./seller.service";
import {SellerDto} from "./dto/seller.dto";
import {GetRightDecorator, GetUserDecorator} from "../user/decorator";
import {User} from "../mongodb/user/user.schema";
import {SellerSwaggerDto} from "../swagger";
import {PaginationDto} from "../pagination/dto/pagination.dto";

@ApiTags('Sellers')
@UseGuards(JwtGuard)
@Controller('sellers')
export class SellerController {
    constructor(private sellerService: SellerService) {
    }

    @Get()
    getAllSellers(@GetRightDecorator(2) right: Boolean, @Query() query: PaginationDto) {
        return this.sellerService.getAllSellers(query);
    }
    @ApiOperation({ summary: 'Получение информации магазина авторизированного пользователя' })
    @ApiResponse({ status: HttpStatus.OK, type: SellerSwaggerDto })
    @Get('me')
    getMeSeller(@GetUserDecorator('sellerId') id: string) {
        return this.sellerService.getSeller(id);
    }
    @ApiOperation({ summary: 'Получение информации магазина по id' })
    @ApiResponse({ status: HttpStatus.OK, type: SellerSwaggerDto })
    @Get(':id')
    getSeller(@Param('id') id: string) {
        return this.sellerService.getSeller(id);
    }
    @ApiOperation({ summary: 'Регистрация нового магазина на id авторизированного пользователя' })
    @ApiBody({ type: SellerDto })
    @ApiResponse({ status: HttpStatus.OK, type: SellerSwaggerDto })
    @Post()
    createSeller(@GetUserDecorator('_id') id: string, @Body() body: SellerDto) {
        return this.sellerService.createSeller(body, id);
    }
    @ApiOperation({ summary: 'Удаление магазина авторизированного пользователя' })
    @Delete('me')
    deleteMeSeller(@GetUserDecorator() body: User) {
        return this.sellerService.deleteSeller(body);
    }
    @Patch('verify/:id')
    verifySeller(@GetRightDecorator(2) right: Boolean, @Param('id') id: string) {
        return this.sellerService.verifySeller(id);
    }
}