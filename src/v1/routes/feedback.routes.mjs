import express from "express";
import {
  createFeedback,
  deleteFeedbackById,
  getAllFeedbacks,
  getFeedbackById,
} from "../controllers/feedback.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import { authorization } from "../../middlewares/authorization.mjs";

const feedbackRouter = express.Router();

feedbackRouter
  .route("/")
  .get(isLoggedIn, authorization("admin"), getAllFeedbacks)
  .post(createFeedback);

feedbackRouter
  .route("/:id([0-9a-fA-F]{24})")
  .get(getFeedbackById)
  .delete(isLoggedIn, authorization("admin"), deleteFeedbackById);

export default feedbackRouter;
