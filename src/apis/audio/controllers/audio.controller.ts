import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AudioService } from '../audio.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('analyze-audio')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload endpoint',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async analyzeAudio(@UploadedFile() file: Express.Multer.File) {
    const result = await this.audioService.forwardToFastAPI(file);
    console.log(result);
    return result;
  }
}
