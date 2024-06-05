import asyncHandler from "express-async-handler";
import feedbackModel from "../../models/feedback.model.mjs";
import { successResponse } from "../../helper/responseHandler.mjs";
import checkMongoID from "../../helper/checkMongoId.mjs";
import createError from "http-errors";

// get all feedbacks
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

// get feedback by id
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

// create feedback
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

// delete feedback by id
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
