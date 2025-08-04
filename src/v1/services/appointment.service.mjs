import checkMongoID from "../../helper/checkMongoId.mjs";
import appointmentModel from "../../models/appointment.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";
import pagination from "../../utils/pagination.mjs";
import asyncHandler from "express-async-handler";

/**
 * @description get all appointments service
 */
export const getAllAppointmentsService = async (req, searchFields) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find appointments data
  // const appointments = await appointmentModel
  //   .find(filters)
  //   .skip(skip)
  //   .limit(limit)
  //   .select(fields)
  //   .sort(sortBy);

  const appointments = await appointmentModel.aggregate([
    {
      $lookup: {
        from: "bookings",
        localField: "name",
        foreignField: "treatment",
        as: "bookedAppointments",
        pipeline: [
          {
            $match: {
              appointmentDate: {
                $eq: req.query.date,
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        bookedSlots: "$bookedAppointments.slot",
      },
    },
    {
      $project: {
        bookedAppointments: 0,
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        slots: {
          $setDifference: ["$slots", "$bookedSlots"],
        },
        // bookedSlots: 1,
      },
    },
  ]);

  // if no user found
  if (!appointments.length) {
    throw createError(404, "Could not find any appointments.");
  }

  // pagination object
  const paginationObject = await pagination({
    limit,
    page: req.query.page,
    skip,
    model: appointmentModel,
    filters,
  });

  return {
    appointments,
    pagination: paginationObject,
  };
};

// get appointment by id
export const getAppointmentByIdService = async (id) => {
  // checkMongoID(id);

  const appointment = await appointmentModel.findById(id);

  if (!appointment) {
    throw createError(404, "Could not find any appointment.");
  }

  return appointment;
};

// delete appointment by id
export const deleteAppointmentServiceById = async (id) => {
  checkMongoID(id);

  const appointment = await appointmentModel.findByIdAndDelete(id);

  if (!appointment) {
    throw createError(404, "Could not find any appointment.");
  }

  return appointment;
};

// create appointment
export const createAppointmentService = async (req) => {
  const appointment = await appointmentModel.create(req.body);

  return appointment;
};

// update appointment by id
export const updateAppointmentServiceById = async (id, data) => {
  checkMongoID(id);

  const appointment = await appointmentModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!appointment) {
    throw createError(404, "Could not find any appointment.");
  }

  return appointment;
};
