import asyncHandler from "express-async-handler";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../app/secret.mjs";
import userModel from "../models/user.model.mjs";
import { clearCookie } from "../helper/cookie.mjs";
import { errorResponse } from "../helper/responseHandler.mjs";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req?.cookies?.accessToken; // direct access token from cookie

  if (!token) {
    throw createError(
      401,
      "Unauthorized, Access token not found. Please login."
    );
  }

  jwt.verify(token, accessTokenSecret, async (err, decode) => {
    if (err) {
      // clear cookie
      clearCookie(res, "accessToken");

      // response send
      return errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Invalid access token.Please login again.",
      });
    }
    // find user
    const loginUser = await userModel.findOne({
      email: decode.email,
    });

    // if user not exist
    if (!loginUser) {
      // clear cookie
      clearCookie(res, "accessToken");
      // send response
      return errorResponse(res, {
        statusCode: 400,
        message: "Unauthorized, Please login .",
      });
    }

    req.me = loginUser;

    next();
  });
});

export const isLoggedOut = asyncHandler(async (req, res, next) => {
  const authToken = req?.cookies?.accessToken;

  // check auth token
  if (authToken) {
    jwt.verify(authToken, accessTokenSecret, async (err, decode) => {
      if (err) {
        // clear cookie
        clearCookie(res, "accessToken");

        // response send
        return errorResponse(res, {
          statusCode: 400,
          message: "Unauthorized, Invalid access token.Please login again",
        });
      }
      // find user
      const loginUser = await userModel.findOne({
        email: decode.email,
      });

      // if user not exist
      if (!loginUser) {
        // clear cookie
        clearCookie(res, "accessToken");
        // response send
        return errorResponse(res, {
          statusCode: 400,
          message: "Unauthorized, User not found.Please login again",
        });
      }

      // response send
      return errorResponse(res, {
        statusCode: 400,
        message: "User is already logged in",
      });
    });
  } else {
    next();
  }
});
