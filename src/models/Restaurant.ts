import { Schema, model } from "mongoose";
import { RestaurantStatus } from "../constants";

const restaurantSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city_id: { type: Schema.Types.ObjectId, ref: "City", required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String },
    cusines: { type: [Schema.Types.ObjectId], ref: "Cuisine", required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: function () {
          return this.location && this.location.coordinates;
        },
      },
      coordinates: { type: [Number] },
    },
    address: { type: String, required: true },
    phone: { type: String },
    cover: { type: String },
    opened_time: { type: Date },
    closed_time: { type: Date },
    delivery_time: { type: Date },
    rating: { type: Number, default: 0 },
    ratingCOunt: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(RestaurantStatus),
      default: RestaurantStatus.OPENNING,
    },
  },
  {
    timestamps: true,
  },
);

restaurantSchema.index({ location: "2dsphere" }, { sparse: true });

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;
