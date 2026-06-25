import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import Banner from "../models/BannerSchema";
import { PostImageBody } from "../schemas";
import { env } from "../config/env";

class BannerController {
  static async addBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const { path, filename } = req.file as PostImageBody;
      const image_url = `${env.DOMAIN}/uploads/${filename}`;
      const banner = await new Banner({ image_url }).save();

      console.log(req.file);
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        banner,
      });
    } catch (err) {
      console.log("Error occurred while uploading banner");
      next(err);
    }
  }

  static async getBannerById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const banner = await Banner.findById(id);
      if (!banner) return next(new AppError("Image is not exists", 404));

      res
        .status(200)
        .json({ success: true, message: "Fetched image successfull", banner });
    } catch (err) {
      console.log("Error occurred while uploading banner");
      next(err);
    }
  }
}

export default BannerController;
