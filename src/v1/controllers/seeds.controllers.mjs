import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import appointmentModel from "../../models/appointment.model.mjs";
import appointmentData from "../../../data/seeds.appointment.mjs";

// seed appointment data
export const seedsAppoinments = asyncHandler(async (req, res, next) => {
  // delete all existing tags
  await appointmentModel.deleteMany({});

  // insert seeds data
  const appointments = await appointmentModel.create(appointmentData);

  // response with success message
  successResponse(res, {
    statusCode: 200,
    message: "Seeds appointment data added successfully.",
    payload: {
      total: appointments.length,
      data: appointments,
    },
  });
});
