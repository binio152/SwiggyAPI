import { Schema, model } from "mongoose";

const cuisineSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, trim: true, unique: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Cuisine = model("Cuisine", cuisineSchema);

export default Cuisine;