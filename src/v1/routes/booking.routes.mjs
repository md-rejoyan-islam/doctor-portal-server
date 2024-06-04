import express from "express";
import {
  createBooking,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  updateBookingById,
} from "../controllers/booking.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";

const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .get(isLoggedIn, getAllBookings)
  .post(isLoggedIn, createBooking);

bookingRouter
  .route("/:id([0-9a-fA-F]{24})")
  .get(getBookingById)
  .patch(updateBookingById)
  .delete(deleteBookingById);

export default bookingRouter;
