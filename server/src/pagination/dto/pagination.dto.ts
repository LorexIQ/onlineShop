import { IsOptional } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {
    @ApiProperty()
    @IsOptional()
    limit: number;
    @ApiProperty()
    @IsOptional()
    offset: number;
    @ApiProperty({ required: false })
    @IsOptional()
    filter: string;
    @ApiProperty({ required: false })
    @IsOptional()
    sort: string;
}