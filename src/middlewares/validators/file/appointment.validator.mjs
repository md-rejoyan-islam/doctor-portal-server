import { body } from "express-validator";
import createError from "http-errors";

export const appointmentCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Appointment name is required")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("price")
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
  body("slots")
    .notEmpty()
    .withMessage("Slots is required")
    .isArray()
    .withMessage("Slots must be an array")
    .custom((value) => {
      if (!value.length) {
        throw createError(400, "Slots must have at least one value");
      }
      return true;
    }),
];
