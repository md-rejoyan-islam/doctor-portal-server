import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import {
  createBookingService,
  deleteBookingByIdService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingByIdService,
} from "../services/booking.service.mjs";

/**
 *
 * @apiDescription    Get All Bookings Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/bookings
 *
 * @apiAccess          Private ( Authenticated Role )
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 * @apiParams         [ search query ]
 *
 * @apiSuccess        { success : true , message, pagination , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   No Booking data found
 *
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  // search query fields
  const searchFields = ["appointment", "appointmentDate"];

  // const bookings = await bookingModel.find({ email: req.query.email });
  const { bookings, pagination } = await getAllBookingsService(
    req,
    searchFields
  );

  successResponse(res, {
    statusCode: 200,
    message: "All bookings fetched successfully",
    payload: {
      pagination,
      data: bookings,
    },
  });
});

/**
 * @apiDescription    Get Booking By Id
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/bookings/:id
 *
 * @apiAccess         Private ( Authenticated Role )
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message, data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any booking.
 *
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await getBookingByIdService(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Booking fetched successfully",
    payload: {
      data: booking,
    },
  });
});

/**
 *
 * @description       Create booking
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/bookings
 * @apiAccess         Private ( Authenticated Role )
 *
 * @apiCookie         { accessToken }
 *
 * @apiBody           { appointment : string , appointmentDate : date }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Bad Request 400 )  You have already booked this appointment.Try another one.
 *
 */
export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req);
  successResponse(res, {
    statusCode: 201,
    message: "Booking created successfully",
    payload: {
      data: booking,
    },
  });
});

/**
 * @description       Delete booking by id
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/bookings/:id
 *
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any booking.
 */
export const deleteBookingById = asyncHandler(async (req, res) => {
  const booking = await deleteBookingByIdService(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Booking deleted successfully",
    payload: {
      data: booking,
    },
  });
});

/**
 *
 * @description       Update booking by id
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/bookings/:id
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiBody           { appointment : string , appointmentDate : date }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any booking.
 */
export const updateBookingById = asyncHandler(async (req, res) => {
  const booking = await updateBookingByIdService(req.params.id, req.body);

  successResponse(res, {
    statusCode: 200,
    message: "Booking updated successfully",
    payload: {
      data: booking,
    },
  });
});
