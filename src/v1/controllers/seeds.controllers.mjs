import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import appointmentModel from "../../models/appointment.model.mjs";
import appointmentData from "../../../data/seeds.appointment.mjs";
import doctosData from "../../../data/seeds.doctor.mjs";
import doctorModel from "../../models/doctor.model.mjs";

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

// seed doctos data
export const seedsDoctors = asyncHandler(async (req, res, next) => {
  // delete all existing tags
  await doctorModel.deleteMany({});

  // insert seeds data
  const doctos = await doctorModel.create(doctosData);

  // response with success message
  successResponse(res, {
    statusCode: 200,
    message: "Seeds appointment data added successfully.",
    payload: {
      total: doctos.length,
      data: doctos,
    },
  });
});
