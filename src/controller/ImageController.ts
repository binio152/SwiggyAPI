import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import Image from "../models/Image";
import { PostImageBody } from "../schemas";
import { env } from "../config/env";

class ImageController {
  static async addImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { path, filename } = req.file as PostImageBody;
      const image_url = `${env.DOMAIN}/uploads/${filename}`;
      const image = await new Image({ image_url }).save();

      console.log(req.file);
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        image,
      });
    } catch (err) {
      console.log("Error occurred while uploading image");
      next(err);
    }
  }

  static async getImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) return next(new AppError("Image is not exists", 404));

      res
        .status(200)
        .json({ success: true, message: "Fetched image successfull", image });
    } catch (err) {
      console.log("Error occurred while uploading image");
      next(err);
    }
  }
}

export default ImageController;
