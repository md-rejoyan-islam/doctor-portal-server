import mongoose, { MongooseError } from "mongoose";
import { errorResponse } from "../helper/responseHandler.mjs";

//error handle middlewares
export const errorHandler = async (err, req, res, next) => {
  try {
    //  mongoose validation error
    if (err instanceof mongoose.Error) {
      // validation error
      if (err instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(err.errors).map((val) => {
          return {
            path: val?.path,
            message:
              val?.reason instanceof mongoose.Error.CastError
                ? val?.message
                : val.properties.message,
          };
        });
        err.errors = validationErrors;
        err.message = `Validation failed`;
        err.status = 422;
      } else if (err instanceof mongoose.Error.CastError) {
        err.message = "Cast Error";
        err.errors = [
          {
            path: err.path,
            message: err.message,
          },
        ];
        err.status = 400;
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
      errors: err.errors,
    });
  } catch (error) {
    errorResponse(res, {
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
};
