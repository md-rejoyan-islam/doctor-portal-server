import express from "express";
import {
  createPayment,
  createPaymentIntent,
  getAllPayments,
} from "../controllers/payment.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import {
  paymentCreateValidator,
  paymentIntentCreateValidator,
} from "../../middlewares/validators/file/payment.validator.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";

const paymentRouter = express.Router();
paymentRouter.route("/").get(getAllPayments);
paymentRouter
  .route("/pay")
  .post(isLoggedIn, paymentCreateValidator, runValidation, createPayment);
paymentRouter
  .route("/create-payment-intent")
  .post(
    isLoggedIn,
    paymentIntentCreateValidator,
    runValidation,
    createPaymentIntent
  );

export default paymentRouter;
