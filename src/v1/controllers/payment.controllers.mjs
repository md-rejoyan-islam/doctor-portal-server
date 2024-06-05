import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import bookingModel from "../../models/booking.model.mjs";
import { strip_secret_key } from "../../app/secret.mjs";
import Stripe from "stripe";
import paymentModel from "../../models/payment.model.mjs";
const stripe = Stripe(strip_secret_key);
import createError from "http-errors";
import {
  createPaymentIntentService,
  createPaymentService,
  getAllPaymentsService,
} from "../services/payment.service.mjs";

/**
 *
 * @description       Create payment intent
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/payments/create-payment-intent
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiBody           { price }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Bad Request 400 )   Please provide all required fields.
 */

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const {
    booking: { price },
  } = req.body;

  const amount = price * 100;

  const paymentIntent = await createPaymentIntentService(amount);

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

/**
 * @description       Create payment
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/payments
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiBody           { price, transactionId, bookingId, email }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Bad Request 400 )   Please provide all the required fields
 *
 */
export const createPayment = asyncHandler(async (req, res) => {
  const result = await createPaymentService(req.body);

  // response
  successResponse(res, {
    statusCode: 200,
    message: "Payment created successfully",
    payload: {
      data: result,
    },
  });
});

/**
 *
 * @description       Get all payments
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/payments
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiQuery          { email }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  No payments found
 */
export const getAllPayments = asyncHandler(async (req, res) => {
  const searchFields = ["price", "transactionId", "bookingId", "email"];

  const { payments, pagination } = await getAllPaymentsService(
    req,
    searchFields
  );

  successResponse(res, {
    statusCode: 200,
    message: "All payments",
    payload: {
      pagination,
      data: payments,
    },
  });
});
