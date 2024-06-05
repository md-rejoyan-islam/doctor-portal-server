import express from "express";
import {
  createBooking,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  updateBookingById,
} from "../controllers/booking.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import { bookingCreateValidator } from "../../middlewares/validators/file/booking.validatr.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";

const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .get(isLoggedIn, getAllBookings)
  .post(isLoggedIn, bookingCreateValidator, runValidation, createBooking);

bookingRouter
  .route("/:id([0-9a-fA-F]{24})")
  .get(isLoggedIn, getBookingById)
  .patch(isLoggedIn, updateBookingById)
  .delete(isLoggedIn, deleteBookingById);

export default bookingRouter;
