import mongoose from "mongoose";
import { errorResponse } from "../helper/responseHandler.mjs";

//error handle middlewares
export const errorHandler = (err, req, res, next) => {
  //  mongoose validation error
  if (err instanceof mongoose.Error) {
    // show first error message only to user
    if (err.errors) {
      Object.values(err.errors).forEach((error, index) => {
        if (index == 0) {
          err.message = error.message;
        }
      });
      // full error details
      // Object.values(err.errors).find((val) => val.message);
    }

    err.status = 400;
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    err.status = 400;
    err.message = ` ${Object.keys(err.keyValue)} must be unique`;
  }

  // jwt token error
  if (err.name === "JsonWebTokenError") {
    err.status = 400;
  }

  const errorMessage = err.message || "UnKnown Error";
  const errorStatus = err.status || 500;

  errorResponse(res, {
    statusCode: errorStatus,
    message: errorMessage,
  });
};
