import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type SellerDocument = Seller & Document

@Schema({ timestamps: true })
export class Seller {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true, unique: true })
    INN: Number;
    @Prop({ required: true, unique: true })
    buyerId: string;
    @Prop({ default: false })
    verify: Boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);