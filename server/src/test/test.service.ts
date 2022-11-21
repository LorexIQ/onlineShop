import {Injectable} from "@nestjs/common";

@Injectable({})
export class TestService {
    sliceArray(data: Array<any>, limit: number, offset: number): Array<any> {
        const slicedArray = data.slice(offset, parseInt(String(offset)) + parseInt(String(limit)));
        slicedArray.forEach(el => el.n = offset++ + 1);
        return slicedArray;
    }
    getRandomSymbol(): String {
        const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
        return alphabet[Math.ceil(Math.random() * (alphabet.length - 1))];
    }
    paginationTest(query: { limit: number; offset: number; }): { count: number; values: Array<Object> } {
        const testArray = [];
        for (let i of Array(200).keys()) {
            testArray.push({
                id: i,
                name: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => this.getRandomSymbol()).join(''),
                status: Math.random() * 50 > 25
            });
        }
        testArray.reverse()
        return {
            count: testArray.length,
            values: !(query.limit && query.offset) ? testArray : this.sliceArray(testArray, query.limit, query.offset)
        };

    }
}