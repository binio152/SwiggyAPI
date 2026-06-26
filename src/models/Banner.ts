import { Schema, model } from "mongoose";

const bannerSchema = new Schema(
  {
    restaurant_id: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    image_url: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Banner = model("Banner", bannerSchema);

export default Banner;
