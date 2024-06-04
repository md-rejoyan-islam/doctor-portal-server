import mongoose from "mongoose";
import { defaultUserImagePath } from "../app/secret.mjs";
import hashPassword from "../utils/hashPassword.mjs";
import { isEmail } from "../helper/helper.mjs";

// user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name can not be less than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      unique: [true, "Email already exist."],
      lowercase: true,
      validate: {
        validator: (value) => {
          return isEmail(value);
        },
        message: "Please enter a valid email.",
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
      set: (value) => {
        return hashPassword(value);
      },
    },
    provider: {
      type: String,
      default: "own",
      enum: ["own", "firebase"],
    },
    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is invalid for gender",
      },
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
      lowercase: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    // for buffer image storing in database
    // photo: {
    //   type: Buffer,
    //   contentType: String,
    // },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
