import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {JwtGuard} from "../auth/guard";
import {ApiTags} from "@nestjs/swagger";
import {SellerService} from "./seller.service";
import {SellerDto} from "./dto/seller.dto";
import {GetUserDecorator} from "../user/decorator";
import {User} from "../mongodb/user/user.schema";

@ApiTags('Sellers')
@UseGuards(JwtGuard)
@Controller('sellers')
export class SellerController {
    constructor(private sellerService: SellerService) {
    }

    @Get('me')
    getMeSeller(@GetUserDecorator('sellerId') id: string) {
        return this.sellerService.getSeller(id);
    }
    @Get(':id')
    getSeller(@Param('id') id: string) {
        return this.sellerService.getSeller(id);
    }
    @Post()
    createSeller(@GetUserDecorator('_id') id: string, @Body() body: SellerDto) {
        return this.sellerService.createSeller(body, id);
    }
    @Delete('me')
    deleteMeSeller(@GetUserDecorator() body: User) {
        return this.sellerService.deleteSeller(body);
    }
}