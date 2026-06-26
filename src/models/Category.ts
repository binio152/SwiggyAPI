import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Category = model("Category", categorySchema);

export default Category;
