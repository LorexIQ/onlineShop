import {
    Controller, Get, HttpStatus,
    Post,
    Query, Res, StreamableFile,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtGuard} from "../auth/guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileService} from "./file.service";
import {Response} from "express";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Files')
@UseGuards(JwtGuard)
@Controller('files')
export class FileController {
    constructor(private fileService: FileService) {}

    @ApiOperation({ summary: 'Загрузка файла в локальное хранилище', description: 'В тело запроса передаётся файл в formData' })
    @ApiBody({ type: String })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    saveFile(@Query('path') path: string, @UploadedFile() file: Express.Multer.File): { path: string, fullPath: string } {
        return this.fileService.saveFile(path, file);
    }
    @ApiOperation({ summary: 'Получение локального файла' })
    @ApiResponse({ status: HttpStatus.OK, type: StreamableFile })
    @Get('download')
    loadFile(@Res({ passthrough: true }) res: Response, @Query('path') path: string) {
        return new StreamableFile(this.fileService.loadFile(path));
    }
}
