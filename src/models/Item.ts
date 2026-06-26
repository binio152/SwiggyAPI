import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    restaurant_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
    cover: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    is_veg: { type: Boolean, required: true, default: false },
    is_active: { type: Boolean, required: true },
    is_available: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  },
);

const Item = model("Item", itemSchema);

export default Item;
