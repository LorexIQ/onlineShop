import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { MongodbService } from './mongodb.service';
import {UserVerify, UserVerifySchema} from "./user/user-verify.schema";
import {Seller, SellerSchema} from "./seller/seller.schema";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserVerify.name, schema: UserVerifySchema },
      { name: Seller.name, schema: SellerSchema }
    ])
  ],
  providers: [MongodbService],
  exports: [MongodbService]
})
export class MongodbModule {}
