import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request } from 'express';
import cloudinary from './CloudinaryFn';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      folder: 'Public/images', // Optional: specify a folder
      format: 'jpg', // supports promises as well
      public_id: `computed-filename-${Date.now()}`, // Optionally compute filename
    };
  },
});

const parser = multer({ storage: storage });

export default parser;
