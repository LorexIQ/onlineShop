import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SellerDto {
    @ApiProperty({ default: 'LorexIQ.Inc', required: true })
    @IsNotEmpty()
    name: string;
    @ApiProperty({ default: 123456789012, required: true })
    @IsNotEmpty()
    INN: Number;
}