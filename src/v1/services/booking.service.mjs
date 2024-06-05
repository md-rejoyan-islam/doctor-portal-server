import checkMongoID from "../../helper/checkMongoId.mjs";
import bookingModel from "../../models/booking.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";

// get all bookings service
export const getAllBookingsService = async (req, searchFields) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find bookings data
  const bookings = await bookingModel
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy)
    .lean();

  // if no user found
  if (!bookings.length) {
    throw createError(404, "Could not find any bookings.");
  }

  // pagination
  const total = await bookingModel.countDocuments(filters);

  return {
    bookings,
    pagination: {
      total,
      skip,
      limit,
    },
  };
};

// create booking service
export const createBookingService = async (req) => {
  const query = {
    appointment: req.body.appointment,
    appointmentDate: req.body.appointmentDate,
  };
  const bookingExist = await bookingModel.exists(query);
  if (bookingExist) {
    throw createError(
      400,
      "You have already booked this appointment.Try another one."
    );
  }

  const booking = await bookingModel.create(req.body);

  return booking;
};

// get booking by id service
export const getBookingByIdService = async (id) => {
  // id validation
  checkMongoID(id);

  const booking = await bookingModel.findById(id).lean();

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }
  return booking;
};

// delete booking by id service
export const deleteBookingByIdService = async (id) => {
  // id validation
  checkMongoID(id);

  const booking = await bookingModel.findByIdAndDelete(id);

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }
  return booking;
};

// update booking by id service
export const updateBookingByIdService = async (id, data) => {
  checkMongoID(id);

  const booking = await bookingModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    throw createError(404, "Could not find any booking.");
  }

  return booking;
};
