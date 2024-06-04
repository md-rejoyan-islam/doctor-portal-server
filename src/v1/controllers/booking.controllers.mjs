import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { successResponse } from "../../helper/responseHandler.mjs";
import checkMongoID from "../../helper/checkMongoId.mjs";
import bookingModel from "../../models/booking.model.mjs";
import app from "../../app/index.mjs";

// get all bookings
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingModel.find({ email: req.query.email });

  // if no bookings found
  if (!bookings.length) {
    throw createError(404, "Could not find any bookings.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "All bookings fetched successfully",
    payload: {
      data: bookings,
    },
  });
});

// get booking by id
export const getBookingById = asyncHandler(async (req, res) => {
  // id validation
  if (checkMongoID(req.params.id)) {
    throw createError(400, "Invalid booking id.");
  }

  const booking = await bookingModel.findById(req.params.id);

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Booking fetched successfully",
    payload: {
      data: booking,
    },
  });
});

// create booking
export const createBooking = asyncHandler(async (req, res) => {
  const query = {
    appointment: req.body.appointment,
    appointmentDate: req.body.appointmentDate,
  };
  const bookingExist = await bookingModel.findOne(query);
  if (bookingExist) {
    throw createError(
      400,
      "You have already booked this appointment.Try another one."
    );
  }

  const booking = await bookingModel.create(req.body);
  successResponse(res, {
    statusCode: 201,
    message: "Booking created successfully",
    payload: {
      data: booking,
    },
  });
});

// update booking by id
export const updateBookingById = asyncHandler(async (req, res) => {
  // id validation
  if (checkMongoID(req.params.id)) {
    throw createError(400, "Invalid booking id.");
  }

  const booking = await bookingModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Booking updated successfully",
    payload: {
      data: booking,
    },
  });
});

// delete booking by id
export const deleteBookingById = asyncHandler(async (req, res) => {
  // id validation
  if (checkMongoID(req.params.id)) {
    throw createError(400, "Invalid booking id.");
  }

  const booking = await bookingModel.findByIdAndDelete(req.params.id);

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Booking deleted successfully",
    payload: {
      data: booking,
    },
  });
});
