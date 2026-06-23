import { Schema, model } from "mongoose";
import { Status, UserRole } from "../schemas";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", UserSchema);

export default User;
