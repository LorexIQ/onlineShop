import {ForbiddenException, Injectable} from "@nestjs/common";
import {MongodbService} from "../mongodb/mongodb.service";
import {SellerDto} from "./dto/seller.dto";
import {User} from "../mongodb/user/user.schema";
import {PaginationService} from "../pagination/pagination.service";
import {PaginationDto} from "../pagination/dto/pagination.dto";

@Injectable()
export class SellerService {
    constructor(private mongo: MongodbService, private builderPag: PaginationService) {}

    async getAllSellers(query: PaginationDto) {
        return this.builderPag.buildPaginationObject(await this.mongo.seller.find().select('-__v'), query);
    }
    getSeller(id: string) {
        const seller = this.mongo.seller.findOne({
            _id: id
        }).select('-__v');
        return seller ? seller : {};
    }
    async createSeller(body: SellerDto, id: string) {
        let seller;
        try {
            seller = await new this.mongo.seller({
                ...body,
                buyerId: id
            }).save();
        } catch (err) {
            switch (Object.keys(err.keyValue)[0]) {
                case 'name':
                    throw new ForbiddenException('Имя магазина уже занято');
                case 'INN':
                    throw new ForbiddenException('ИНН уже используется в другом магазине');
                case 'buyerId':
                    throw new ForbiddenException('На данного покупателя уже зарегистрирован магазин');
            }
        }
        await this.mongo.user.updateOne({ _id: id }, {
            sellerId: seller._id
        }).catch(err => {
            seller.remove();
            throw new ForbiddenException('Покупатель не найден');
        });
        return seller;
    }
    async deleteSeller(id: string) {
        if (id) {
            const seller = await this.mongo.seller.findOne({ _id: id });
            await this.mongo.user.updateOne({ _id: seller.buyerId }, { $unset: { sellerId: 1 }});
            seller.remove();
        } else {
            throw new ForbiddenException('Продавец не найден');
        }
    }

    async verifySeller(id: string) {
        const seller = await this.mongo.seller.findOne({ _id: id });
        if (seller) {
            await this.mongo.seller.updateOne({ _id: id }, { verify: true });
        } else {
            throw new ForbiddenException('Продавец не найден');
        }
    }
}