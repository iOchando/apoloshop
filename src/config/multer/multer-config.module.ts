import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
// import { S3Client } from '@aws-sdk/client-s3';
// import multerS3 from 'multer-s3';
// import multer from 'multer';

// const s3Config = new S3Client({
//   endpoint: 'https://nyc3.digitaloceanspaces.com',
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// const storage = multerS3({
//   s3: s3Config,
//   acl: 'public-read',
//   bucket: process.env.AWS_STORAGE_BUCKET_NAME!,
//   metadata: function (req: any, file, cb) {
//     const userId = req.client._httpMessage.req.params.userId as String;
//     cb(null, { fieldName: file.fieldname, userId });
//   },
//   key: function (req: any, file, cb) {
//     const userId = req.client._httpMessage.req.params.userId as String;
//     const folder = 'apoloshop/user_' + userId;
//     const fileName = generateFileName(file.originalname, file.fieldname);
//     cb(null, `${folder}/${fileName}`);
//   },
// });

const storage = diskStorage({
  destination: join(__dirname, '../..', 'uploads'),
  filename: function (req, file, cb) {
    const userId = req.params.userId as String;
    const folder = 'apoloshop/user_' + userId;
    const fileName = generateFileName(file.originalname, file.fieldname);
    cb(null, `${fileName}`);
    // cb(null, `${folder}/${fileName}`);
  },
});

const generateFileName = (originalFileName: string, fieldname: string) => {
  // const uuid = uuidv4();
  // const extension = originalFileName.split('.').pop();
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extension = extname(originalFileName);
  return `${uniqueSuffix}${extension}`;
};

@Module({
  imports: [
    MulterModule.register({
      // dest: '/uploads',
      storage,
    }),
  ],
  exports: [MulterModule],
})
export class MulterConfigModule {}
