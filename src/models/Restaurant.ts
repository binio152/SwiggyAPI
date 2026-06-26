import { Schema, model } from "mongoose";
import { RestaurantStatus } from "../constants";

const restaurantSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city_id: { type: Schema.Types.ObjectId, ref: "City", required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String },
    cuisines: { type: [Schema.Types.ObjectId], ref: "Cuisine", required: true },
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: function () {
          return this.location && this.location.coordinates;
        },
      },
      coordinates: { type: [Number] }, // [lat, lng]
    },
    phone: { type: String },
    cover: { type: Schema.Types.ObjectId, ref: "Image" },
    opened_time: { type: String, required: true },
    closed_time: { type: String, required: true },
    delivery_time: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(RestaurantStatus),
      default: RestaurantStatus.OPENNING,
    },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

restaurantSchema.index({ location: "2dsphere" }, { sparse: true });

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
