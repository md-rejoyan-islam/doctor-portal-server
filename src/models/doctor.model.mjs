import mongoose from "mongoose";
import { isEmail } from "../helper/helper.mjs";

// doctor schema
const doctorSchema = mongoose.Schema(
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
    specialty: {
      type: String,
      required: [true, "Please provide your specialty"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Please provide your degree"],
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
