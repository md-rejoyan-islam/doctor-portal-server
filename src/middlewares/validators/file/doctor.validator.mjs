import { body } from "express-validator";
import createError from "http-errors";

// create doctor validator
export const doctorCreateValidator = [
  body("name")
    .notEmpty()
    .withMessage("Doctor name is required")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("photo")
    .notEmpty()
    .withMessage("Photo is required")
    .custom((_, { req }) => {
      if (!req.file) {
        throw createError(400, "Please provide a photo.");
      }
      return true;
    }),
  body("specialty")
    .notEmpty()
    .withMessage("Specialty is required")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Specialty must be at least 3 characters long"),
  body("degree")
    .notEmpty()
    .withMessage("Degree is required")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Degree must be at least 3 characters long"),
];

// update doctor validator
export const doctorUpdateValidator = [
  body("name")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("photo").optional().isURL().withMessage("Invalid photo url"),
  body("specialty")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Specialty must be at least 3 characters long"),
  body("degree")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Degree must be at least 3 characters long"),
];
