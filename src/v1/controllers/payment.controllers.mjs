import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import bookingModel from "../../models/booking.model.mjs";
import { strip_secret_key } from "../../app/secret.mjs";
import Stripe from "stripe";
import paymentModel from "../../models/payment.model.mjs";
const stripe = Stripe(
  "sk_test_51OKltMHHEHd8JSMRCOctaxqYMhERgUEguV6dH1stuln04V5LBglRk7SKFVtlynl6P8uFoZbMcbESiJbkiDZRrHik00UTOXERUb"
);

// create payment intent

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const booking = req.body;
  const price = booking.price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });

  successResponse(res, {
    statusCode: 200,
    message: "Payment intent created successfully",
    payload: {
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    },
  });
});

// create payment
export const createPayment = asyncHandler(async (req, res) => {
  const { price, transactionId, bookingId, email } = req.body;

  if (!price || !transactionId || !bookingId || !email) {
    throw createError(400, "Please provide all the required fields");
  }

  const result = await paymentModel.create(req.body);

  const updatedDoc = {
    $set: {
      paid: true,
      transactionId: transactionId,
    },
  };
  const updatedResult = await bookingModel.updateOne(
    {
      _id: bookingId,
    },
    updatedDoc,
    {
      new: true,
      runValidators: true,
    }
  );

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Payment created successfully",
    payload: {
      data: updatedResult,
    },
  });
});
