import {Controller, Get, Query} from "@nestjs/common";
import {TestService} from "./test.service";

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Get('pagination')
    paginationTest(@Query() query: { limit: number; offset: number; }) {
        return this.testService.paginationTest(query);
    }
}