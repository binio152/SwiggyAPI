import { Schema, model } from "mongoose";

const imageSchema = new Schema(
  {
    image_url: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Image = model("Image", imageSchema);

export default Image;
