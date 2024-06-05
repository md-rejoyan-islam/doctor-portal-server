import asyncHandler from "express-async-handler";
import feedbackModel from "../../models/feedback.model.mjs";
import { successResponse } from "../../helper/responseHandler.mjs";
import checkMongoID from "../../helper/checkMongoId.mjs";
import createError from "http-errors";
import {
  createFeedbackService,
  deleteFeedbackServiceById,
  getAllFeedbacksService,
  getFeedbackByIdService,
} from "../services/feedback.service.mjs";

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
  const searchFields = ["name", "email", "message"];

  const { feedbacks, pagination } = await getAllFeedbacksService(
    req,
    searchFields
  );

  successResponse(res, {
    statusCode: 200,
    message: "Feedback data fetched successfully",
    payload: {
      pagination,
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
  const feedback = await getFeedbackByIdService(req.params.id);

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
  const feedback = await createFeedbackService(req.body);

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
  const feedback = await deleteFeedbackServiceById(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Feedback deleted successfully",
    payload: {
      data: feedback,
    },
  });
});
