import { body } from "express-validator";
import createError from "http-errors";

// create booking validator
export const bookingCreateValidator = [
  body("appointment")
    .notEmpty()
    .withMessage("Appointment is required")
    .isMongoId()
    .withMessage("Invalid appointment id"),
  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("selectedDate")
    .notEmpty()
    .withMessage("Selected date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("treatment")
    .notEmpty()
    .withMessage("Treatment is required")
    .isString()
    .withMessage("Treatment must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isInt({ min: 1 })
    .withMessage("Price must be at least 1"),
  body("slot")
    .notEmpty()
    .withMessage("Slot is required")
    .isString()
    .withMessage("Slot must be a string"),
  body("patient")
    .notEmpty()
    .withMessage("Patient is required")
    .isMongoId()
    .withMessage("Invalid patient id"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];
