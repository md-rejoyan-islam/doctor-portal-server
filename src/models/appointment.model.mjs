import mongoose from "mongoose";

// user schema
const appointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name can not be less than 3 characters"],
    },
    slots: {
      type: Array,
      default: ["08.00 AM - 08.30 AM"],
    },
    price: {
      type: Number,
      required: [true, "Please provide the price"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
