import {ForbiddenException, Injectable} from "@nestjs/common";
import {MongodbService} from "../mongodb/mongodb.service";
import {SellerDto} from "./dto/seller.dto";
import {User} from "../mongodb/user/user.schema";

@Injectable()
export class SellerService {
    constructor(private mongo: MongodbService) {}

    getSeller(id: string) {
        const seller = this.mongo.seller.findOne({
            buyerId: id
        });
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
    async deleteSeller(body: User) {
        if (body.sellerId) {
            const seller = await this.mongo.seller.findOne({ _id: body.sellerId });
            await this.mongo.user.updateOne({ _id: body['_id'] }, { $unset: { sellerId: 1 }});
            seller.remove();
        } else {
            throw new ForbiddenException('Продавец не найден');
        }
    }
}