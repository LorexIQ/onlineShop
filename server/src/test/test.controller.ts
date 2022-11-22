import { Controller, Get, Query } from "@nestjs/common";
import { TestService } from "./test.service";
import { PaginationDto } from "../pagination/dto/pagination.dto";

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Get('pagination')
    paginationTest(@Query() query: PaginationDto) {
        return this.testService.paginationTest(query);
    }
}