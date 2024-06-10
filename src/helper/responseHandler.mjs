import { errorLogger } from "./logger.mjs";

export const errorResponse = (
  res,
  { statusCode = 500, message = "Unknown Server Error", errors }
) => {
  // log error
  errorLogger.error(message);

  return res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
      errors,
    },
  });
};

export const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...payload,
  });
};
