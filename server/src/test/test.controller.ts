import { Controller, Get, Query } from "@nestjs/common";
import { TestService } from "./test.service";
import { PaginationDto } from "../pagination/dto/pagination.dto";
import {ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags('Tests')
@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @ApiOperation({ summary: 'Получение тестовых данных для пагинации' })
    @Get('pagination')
    paginationTest(@Query() query: PaginationDto) {
        return this.testService.paginationTest(query);
    }
}