import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserVerifyDocument = UserVerify & Document;

@Schema({ timestamps: true, expires: '5m' })
export class UserVerify {
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    code: Number;
    @Prop({ default: new Date(), expires: '6m', type: Date })
    updatedAt: Date;
}
export const UserVerifySchema = SchemaFactory.createForClass(UserVerify);