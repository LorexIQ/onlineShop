import {Injectable} from "@nestjs/common";
import {PaginationService} from "../pagination/pagination.service";
import { PaginationDto } from "../pagination/dto/pagination.dto";

@Injectable({})
export class TestService {
    constructor(private builderPag: PaginationService) {}

    getRandomSymbol(): String {
        const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
        return alphabet[Math.ceil(Math.random() * (alphabet.length - 1))];
    }
    paginationTest(query: PaginationDto): { count: number; values: Array<Object> } {
        const testArray = [];
        for (let i of Array(200).keys()) {
            testArray.push({
                id: i,
                name: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => this.getRandomSymbol()).join(''),
                status: Math.random() * 50 > 25
            });
        }
        testArray.reverse()
        return this.builderPag.buildPaginationObject(testArray, query);

    }
}