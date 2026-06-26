import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

citySchema.index({ location: "2dsphere" });

const City = model("City", citySchema);

export default City;
