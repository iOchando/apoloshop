import {
  PipeTransform,
  Injectable,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { fileTypeFromFile } from 'file-type';
import { HttpStatus } from 'src/shared/enums/httpStatus.enum';

@Injectable()
export class ImageTypeValidationPipe implements PipeTransform {
  async transform(files: Record<string, Express.Multer.File[]>) {
    for (const field of Object.keys(files)) {
      for (const file of files[field]) {
        const MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
        if (!MIME_TYPES.includes(file.mimetype)) {
          throw new HttpException(
            `The ${field} image should be either jpeg, png, or webp.`,
            HttpStatus.HTTP_400_BAD_REQUEST,
          );
        }
      }
    }
    return files;
  }
}
