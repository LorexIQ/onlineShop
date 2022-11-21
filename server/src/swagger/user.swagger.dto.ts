import { ApiProperty } from "@nestjs/swagger";

export class UserSwaggerDto {
    @ApiProperty({ default: '63652fb805c8c43d9ffe1fc3' })
    _id: string;
    @ApiProperty({ default: 'tested1' })
    username: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty({ default: true })
    emailVerify: Boolean;
    @ApiProperty({ default: 'Test', required: false })
    firstName: string;
    @ApiProperty({ default: 'Testov', required: false })
    secondName: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    sellerId: string;
}