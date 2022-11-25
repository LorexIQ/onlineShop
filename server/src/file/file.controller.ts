import {
    Controller, Get, Header,
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

@UseGuards(JwtGuard)
@Controller('files')
export class FileController {
    constructor(private fileService: FileService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    saveFile(@Query('path') path: string, @UploadedFile() file: Express.Multer.File): { path: string, fullPath: string } {
        return this.fileService.saveFile(path, file);
    }
    @Get('download')
    loadFile(@Res({ passthrough: true }) res: Response, @Query('path') path: string) {
        return new StreamableFile(this.fileService.loadFile(path));
    }
}
