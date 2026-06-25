import { Router } from "express";
import Validate from "../middlewares/validate";
import { getImageSchema, postImageSchema } from "../schemas";
import BannerController from "../controller/BannerController";
import { upload } from "../utils/MulterService";

class BannerRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
  }

  getRoutes() {
    this.router.get(
      "/:id",
      Validate.request({ schema: getImageSchema, type: "params" }),
      BannerController.getBannerById,
    );
  }

  postRoutes() {
    this.router.post(
      "/banner",
      Validate.jwt,
      Validate.isAdmin,
      upload.single("image_url"),
      Validate.request({ schema: postImageSchema, type: "file" }),
      BannerController.addBanner,
    );
  }

  patchRoutes() {}
}

export default new BannerRouter().router;
