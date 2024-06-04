import mongoose from "mongoose";
import { isEmail } from "../helper/helper.mjs";

// user schema
const paymentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          return isEmail(value);
        },
        message: "Please enter a valid email.",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide the price"],
    },
    transactionId: {
      type: String,
      required: [true, "Please provide the transaction ID"],
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Please provide the booking ID"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
