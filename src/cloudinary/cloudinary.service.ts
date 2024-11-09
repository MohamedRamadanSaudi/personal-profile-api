import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from '../config/cloudinary.config';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config(CloudinaryConfig);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'certificates' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      upload.end(file.buffer);
    });
  }
}
