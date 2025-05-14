import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { appSettings } from 'src/configs/app-settings';

@Injectable()
export class AudioService {
  async forwardToFastAPI(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = await axios.post(
        appSettings.microserviceAPI.audioProcessing!,
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error calling FastAPI:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
