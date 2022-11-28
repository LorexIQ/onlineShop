import {ForbiddenException, Injectable} from "@nestjs/common";
import { PaginationDto } from "./dto/pagination.dto";

@Injectable()
export class PaginationService {
    constructor() {}

    checkItemAccordFilter(item: Object, filter: { keys: Array<string>, value: string }): Boolean {
        let according: Boolean = false;
        for (const key of filter.keys) {
            if (`${item[key]}`.toLowerCase().includes(filter.value.toLowerCase())) {
                according = true;
            }
        }
        return according;
    }

    buildPaginationObject(data: Array<any>, query: PaginationDto): { count: number; values: Array<Object> } {
        data = JSON.parse(JSON.stringify(data));
        const fullData: boolean = query.limit === undefined || query.offset === undefined;
        if (query.filter && query.filter.length) {
            const [keysString, value] = query.filter.split('-');
            try {
                const keys = keysString.split('*');
                data = data.filter(item => this.checkItemAccordFilter(item, { keys, value }))
            } catch (err) {
                throw new ForbiddenException('Ошибка параметров фильтрации');
            }
        }
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