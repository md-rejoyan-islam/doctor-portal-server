import { Schema } from "mongoose";
import mongoose from "mongoose";

// user schema
const appointmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name can not be less than 3 characters"],
      unique: [true, "Name already exists"],
    },
    slots: {
      type: [String],
      default: ["08.00 AM - 08.30 AM"],
    },
    price: {
      type: Number,
      cast: "{VALUE} is not a number",
      required: [true, "Please provide the price"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
