import { IsOptional } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {
    @ApiProperty()
    @IsOptional()
    limit: number;
    @ApiProperty()
    @IsOptional()
    offset: number;
}