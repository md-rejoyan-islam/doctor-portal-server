import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import { errorResponse } from "../../helper/responseHandler.mjs";

const runValidation = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, {
      statusCode: 422,
      message: errors.array()[0].msg,
    });
  }
  next();
});

export default runValidation;
