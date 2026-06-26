import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
      default: 0.0,
    },
    lng: {
      type: Number,
      required: true,
      default: 0.0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const City = model("City", citySchema);

export default City;
