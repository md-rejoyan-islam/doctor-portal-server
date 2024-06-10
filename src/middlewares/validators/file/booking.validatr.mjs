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
    .isString()
    .withMessage("Appointment date must be a string")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date)) {
        throw createError(400, "Invalid date format");
      }
      return true;
    }),
  body("selectedDate")
    .notEmpty()
    .withMessage("Selected date is required")
    .isDate()
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
