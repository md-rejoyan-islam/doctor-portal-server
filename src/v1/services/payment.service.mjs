import Stripe from "stripe";
import { strip_secret_key } from "../../app/secret.mjs";
const stripe = Stripe(strip_secret_key);

import bookingModel from "../../models/booking.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";
import pagination from "../../utils/pagination.mjs";
import paymentModel from "../../models/payment.model.mjs";
import createError from "http-errors";

// create payment intent service
export const createPaymentIntentService = async (amount) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });

  return paymentIntent;
};

// create payment
export const createPaymentService = async (data) => {
  const { transactionId, bookingId } = data;

  await paymentModel.create(data);

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

  return updatedResult;
};

// get all payments service
export const getAllPaymentsService = async (req, searchFields) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find payments data
  const payments = await paymentModel
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy);

  // if no user found
  if (!payments.length) {
    throw createError(404, "Could not find any payments.");
  }

  // pagination
  const paginationObject = await pagination({
    limit,
    page: req.query.page,
    skip,
    model: paymentModel,
    filters,
  });

  return {
    payments,
    pagination: paginationObject,
  };
};
