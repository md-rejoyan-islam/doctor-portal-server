import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import { getAllAppointmentsService } from "../services/appointment.service.mjs";
import appointmentModel from "../../models/appointment.model.mjs";
import bookingModel from "../../models/booking.model.mjs";

/**
 *
 * @apiDescription    Get All Appointment Data
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/appointments
 * @apiAccess          Public
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 * @apiParams         [ search query ]
 *
 *
 * @apiSuccess        { success : true , message, pagination , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  No Appointment data found
 *
 */

export const getAllAppointments = asyncHandler(async (req, res) => {
  // search query fields
  const searchFields = ["name"];
  console.log(req.query.date);
  // default page and limit value
  req.query.page = Number(req.query.page) || 1;
  req.query.limit = Number(req.query.limit) || 10;

  const result = await appointmentModel.aggregate([
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

  // console.log(result);

  // response
  return successResponse(res, {
    statusCode: 200,
    message: "Appointdata data fetched successfully",
    payload: {
      //   pagination,
      //   data: appointments,
      data: result,
    },
  });
});

// update appointment

export const updateAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentModel.updateMany(
    {},
    {
      $set: {
        price: 999,
      },
    },
    {
      upsert: true,
    }
  );

  successResponse(res, {
    statusCode: 200,
    message: "Appointment updated successfully",
    payload: {
      data: result,
    },
  });
});
