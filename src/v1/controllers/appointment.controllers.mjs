import asyncHandler from "express-async-handler";
import { successResponse } from "../../helper/responseHandler.mjs";
import {
  createAppointmentService,
  deleteAppointmentServiceById,
  getAllAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentServiceById,
} from "../services/appointment.service.mjs";

/**
 *
 * @description       Create appointment
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/appointments
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiBody           { name, price, slots}
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 *
 */
export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await createAppointmentService(req);

  successResponse(res, {
    statusCode: 201,
    message: "Appointment created successfully",
    payload: {
      data: appointment,
    },
  });
});

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
 * @apiError          ( Not Found 404 )  Could not find any appointment.
 *
 */

export const getAllAppointments = asyncHandler(async (req, res) => {
  // search query fields
  const searchFields = ["name"];
  console.log(req.query.date);
  // default page and limit value
  req.query.page = Number(req.query.page) || 1;
  req.query.limit = Number(req.query.limit) || 10;

  const { appointments, pagination } = await getAllAppointmentsService(
    req,
    searchFields
  );

  // response
  return successResponse(res, {
    statusCode: 200,
    message: "Appointdata data fetched successfully",
    payload: {
      pagination,
      data: appointments,
    },
  });
});

/**
 *
 * @description       Get appointment by id
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/appointments/:id
 * @apiAccess         Public
 *
 * @apiParams         id
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any appointment.
 *
 */

export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await getAppointmentByIdService(req.params.id);
  successResponse(res, {
    statusCode: 200,
    message: "Appointment data fetched successfully",
    payload: {
      data: appointment,
    },
  });
});

/**
 *
 * @description       Delete appointment by id
 * @apiMethod         DELETE
 *
 * @apiRoute          /api/v1/appointments/:id
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         id
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any appointment.
 *
 */
export const deleteAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await deleteAppointmentServiceById(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Appointment deleted successfully",
    payload: {
      data: appointment,
    },
  });
});

/**
 *
 * @description       Update appointment by id
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/appointments/:id
 * @apiAccess         Private
 *
 * @apiCookie         { accessToken }
 *
 * @apiParams         id
 * @apiBody           { name, price, slots}
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Could not find any appointment.
 */
export const updateAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await updateAppointmentServiceById(
    req.params.id,
    req.body
  );

  successResponse(res, {
    statusCode: 200,
    message: "Appointment updated successfully",
    payload: {
      data: appointment,
    },
  });
});
