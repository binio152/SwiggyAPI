import { Schema, model } from "mongoose";

const bannerSchema = new Schema(
  {
    image_url: { type: String, required: true, trim: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Banner = model("Banner", bannerSchema);

export default Banner;
