import { body } from "express-validator";
import createError from "http-errors";

export const userRegisterValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.Please provide a name.")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be at least 3-30 characters long."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .optional()
    .custom((value, { req }) => {
      if (req.body.provider === "own") {
        if (!value) {
          throw createError(400, "Password is required.");
        } else if (value.length < 8) {
          throw createError(
            400,
            "Password must be at least 8 characters long."
          );
        }
      }
      return true;
    }),
  body("provider")
    .notEmpty()
    .withMessage("Provider is required.Please provide a provider.")
    .isIn(["own", "firebase"])
    .withMessage(
      "Please provide a valid provider.Value must be own or firebase."
    ),
];

export const userLoginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.Please provide a password.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
];

export const userPasswordUpdateValidator = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw createError(400, "Password does not match");
      }
      return true;
    }),
];

export const userVerifyCodeValidator = [
  body("code")
    .notEmpty()
    .withMessage("Code is required.Please provide a code.")
    .isLength({ min: 4 })
    .withMessage("Code must be at least 4 characters long."),
];

export const userResendCodeValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
];

export const userResetPasswordValidator = [
  body("resetToken")
    .notEmpty()
    .withMessage("Reset token is required.Please provide a reset token."),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number."
    ),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw createError(400, "Password does not match");
      }
      return true;
    }),
];
