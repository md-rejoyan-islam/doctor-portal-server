import { body } from "express-validator";
import createError from "http-errors";

// create payment intent validator
export const paymentIntentCreateValidator = [
  body("booking")
    .notEmpty()
    .withMessage("Booking is required")
    .isObject()
    .withMessage("Booking is required"),
  body("booking.price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isInt({ min: 1 })
    .withMessage("Price must be at least 1")
    .custom((value) => {
      if (value < 1) {
        throw createError(400, "Price must be at least 1");
      }
      return true;
    }),
];

// create payment validator
export const paymentCreateValidator = [
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isInt({ min: 1 })
    .withMessage("Price must be at least 1"),
  body("transactionId")
    .notEmpty()
    .withMessage("Transaction id is required")
    .isString()
    .withMessage("Transaction id must be a string"),
  body("bookingId")
    .notEmpty()
    .withMessage("Booking id is required")
    .isMongoId()
    .withMessage("Invalid booking id"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
];
