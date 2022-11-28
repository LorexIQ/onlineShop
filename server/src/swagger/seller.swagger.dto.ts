import {ApiProperty} from "@nestjs/swagger";

export class SellerSwaggerDto {
    @ApiProperty({ default: '63848a8df1d5f0b5547d2847' })
    _id: string;
    @ApiProperty({ default: 'LorexIQ.Inc' })
    name: string;
    @ApiProperty({ default: 123456789012 })
    INN: Number;
    @ApiProperty({ default: '6370ff9897de34f75f6c8d57' })
    buyerId: string;
    @ApiProperty({ default: false })
    verify: Boolean;
    @ApiProperty({ default: new Date() })
    createdAt: Date;
    @ApiProperty({ default: new Date() })
    updatedAt: Date;
}