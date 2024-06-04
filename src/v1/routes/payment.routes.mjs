import express from "express";
import {
  createPayment,
  createPaymentIntent,
} from "../controllers/payment.controllers.mjs";

const paymentRouter = express.Router();

paymentRouter.route("/pay").post(createPayment);
paymentRouter.route("/create-payment-intent").post(createPaymentIntent);

export default paymentRouter;
