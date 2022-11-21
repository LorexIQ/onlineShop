import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user/user.schema';
import { UserVerify, UserVerifyDocument } from "./user/user-verify.schema";
import {Seller, SellerDocument} from "./seller/seller.schema";

@Injectable()
export class MongodbService {
  constructor(
      @InjectModel(User.name) public user: Model<UserDocument>,
      @InjectModel(UserVerify.name) public userVerify: Model<UserVerifyDocument>,
      @InjectModel(Seller.name) public seller: Model<SellerDocument>
  ) {
  }
}
