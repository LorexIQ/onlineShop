import { Injectable } from "@nestjs/common";
import { PaginationDto } from "./dto/pagination.dto";

@Injectable()
export class PaginationService {
    constructor() {}

    buildPaginationObject(data: Array<any>, query: PaginationDto): { count: number; values: Array<Object> } {
        data = JSON.parse(JSON.stringify(data));
        const fullData: boolean = query.limit === undefined || query.offset === undefined;
        const resData = {
            count: data.length,
            returned: 0,
            requested: fullData ? -1 : parseInt(String(query.limit)),
            values: fullData ? data : data.slice(query.offset, parseInt(String(query.offset)) + parseInt(String(query.limit)))
        };
        resData.returned = resData.values.length;
        resData.values.forEach(el => el.n = query.offset++ + 1);
        return resData;
    }
}