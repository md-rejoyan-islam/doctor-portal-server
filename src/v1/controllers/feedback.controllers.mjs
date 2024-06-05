import asyncHandler from "express-async-handler";
import feedbackModel from "../../models/feedback.model.mjs";
import { successResponse } from "../../helper/responseHandler.mjs";
import checkMongoID from "../../helper/checkMongoId.mjs";
import createError from "http-errors";

/**
 *
 * @description    Get All Feedbacks
 * @apiMethod      GET
 *
 * @apiRoute       /api/v1/feedbacks
 * @apiAccess      Private
 *
 * @apiCookie      { accessToken }
 *
 * @apiQuery       [ email = string ]
 *
 * @apiSuccess     { success : true , message , data }
 * @apiFailed      { success : false, error : { status : code , message} }
 * @apiError       ( Not Found 404 )  Could not find any feedbacks.
 */
export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const email = req.query.email;

  let feedbacks;
  if (email) {
    feedbacks = await feedbackModel.find({ email }).lean();
  } else {
    feedbacks = await feedbackModel.find().lean();
  }

  if (!feedbacks.length) {
    throw createError(404, "Could not find any feedbacks.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Feedback data fetched successfully",
    payload: {
      data: feedbacks,
    },
  });
});

/**
 * @description       Get feedback by id
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/feedbacks/:id
 * @apiAccess         Private
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   Could not find any feedback.
 */
export const getFeedbackById = asyncHandler(async (req, res) => {
  checkMongoID(req.params.id);

  const feedback = await feedbackModel.findById(req.params.id).lean();

  if (!feedback) {
    throw createError(404, "Could not find any feedback.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Feedback fetched successfully",
    payload: {
      data: feedback,
    },
  });
});

/**
 * @description       Create feedback
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/feedbacks
 * @apiAccess         Public
 *
 * @apiBody           { name : string , email : string , message : string }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Bad Request 400 )   Please provide all the required fields
 */
export const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw createError(400, "Please provide all the required fields");
  }

  const feedback = await feedbackModel.create(req.body);

  successResponse(res, {
    statusCode: 201,
    message: "Thank you for your feedback.",
    payload: {
      data: feedback,
    },
  });
});

/**
 * @description       Delete feedback by id
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/feedbacks/:id
 *
 * @apiAccess         Private
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   Could not find any feedback.
 *
 */
export const deleteFeedbackById = asyncHandler(async (req, res) => {
  checkMongoID(req.params.id);

  const feedback = await feedbackModel.findByIdAndDelete(req.params.id);

  if (!feedback) {
    throw createError(404, "Could not find any feedback.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Feedback deleted successfully",
    payload: {
      data: feedback,
    },
  });
});
