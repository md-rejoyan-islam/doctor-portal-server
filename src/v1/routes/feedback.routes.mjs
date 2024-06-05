import express from "express";
import {
  createFeedback,
  deleteFeedbackById,
  getAllFeedbacks,
  getFeedbackById,
} from "../controllers/feedback.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import { authorization } from "../../middlewares/authorization.mjs";
import { feedbackCreateValidator } from "../../middlewares/validators/file/feedback.validator.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";

const feedbackRouter = express.Router();

feedbackRouter
  .route("/")
  .get(isLoggedIn, getAllFeedbacks)
  .post(feedbackCreateValidator, runValidation, createFeedback);

feedbackRouter
  .route("/:id([0-9a-fA-F]{24})")
  .get(getFeedbackById)
  .delete(isLoggedIn, authorization("admin"), deleteFeedbackById);

export default feedbackRouter;
