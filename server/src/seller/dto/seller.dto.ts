import {IsNotEmpty} from "class-validator";

export class SellerDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    INN: Number;
}