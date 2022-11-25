import {ForbiddenException, Injectable} from '@nestjs/common';
import {createReadStream, createWriteStream, existsSync, mkdirSync} from "fs";
import {join} from "path";

@Injectable()
export class FileService {
    parsePathFile(path: string) {
        return [
            './home/' + path.substring(0, path.lastIndexOf('/') + 1),
            path.substring(path.lastIndexOf('/') + 1)
        ];
    }
    saveFile(path: string, file: Express.Multer.File): { path: string, fullPath: string } {
        const [dirPath, fileName] = this.parsePathFile(path);
        if (!existsSync(dirPath)){
            mkdirSync(dirPath, { recursive: true });
        }
        const ws = createWriteStream(`./home/` + path);
        ws.write(file.buffer);
        return {
            path: path,
            fullPath: dirPath + fileName
        };
    }
    loadFile(path: string) {
        const [dirPath, fileName] = this.parsePathFile(path);
        if (!existsSync(dirPath + fileName)){
            throw new ForbiddenException('Файл не найден');
        }
        try {
            return createReadStream(join(process.cwd(), dirPath + fileName));
        } catch (err) {
            throw new ForbiddenException('Ошибка чтения файла');
        }
    }
}
