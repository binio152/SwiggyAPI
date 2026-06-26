import { Router } from "express";
import Validate from "../middlewares/validate";
import { getImageSchema, postImageSchema } from "../schemas";
import ImageController from "../controller/ImageController";
import { upload } from "../utils/MulterService";

class ImageRouter {
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
      ImageController.getImageById,
    );
  }

  postRoutes() {
    this.router.post(
      "/upload",
      Validate.jwt,
      Validate.isAdmin,
      upload.single("image_url"),
      Validate.request({ schema: postImageSchema, type: "file" }),
      ImageController.addImage,
    );
  }

  patchRoutes() {}
}

export default new ImageRouter().router;
