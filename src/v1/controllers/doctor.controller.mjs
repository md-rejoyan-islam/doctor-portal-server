import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { successResponse } from "../../helper/responseHandler.mjs";
import {
  createDoctorService,
  deleteDoctorServiceById,
  getAllDoctorsService,
  getDoctorByIdService,
  updateDoctorServiceById,
} from "../services/doctor.service.mjs";

/**
 * @description get all doctors
 *
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/doctors
 * @apiAccess         Public
 *
 * @apiParams         [ page = number ]     default page = 1
 * @apiParams         [ limit = number ]    min = 1, default = 10
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Currently there are no doctors available.
 */
export const getAllDoctors = asyncHandler(async (req, res) => {
  const searchFields = ["name", "email", "specialty", "degree"];

  const { doctors, pagination } = await getAllDoctorsService(req, searchFields);

  successResponse(res, {
    statusCode: 200,
    message: "All doctors fetched successfully.",
    payload: {
      pagination,
      data: doctors,
    },
  });
});

/**
 * @description      Create a doctor
 * @apiMethod         POST
 *
 * @apiRoute          /api/v1/doctors
 *
 * @apiAccess         Private (Admin Role)
 *
 * @apiBody           { name : string , email : string , specialty : string , degree : string }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Bad Request 400 )   Please provide all required fields.
 */
export const createDoctor = asyncHandler(async (req, res) => {
  if (!name || !email || !specialty || !degree) {
    throw createError(400, "Please provide all required fields.");
  }

  const result = await createDoctorService(req);

  successResponse(res, {
    statusCode: 201,
    message: "Doctor created successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 * @description       Update doctor by id
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/doctors/:id
 * @apiAccess         Private (Admin Role)
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   Could not find the doctor.
 */
export const deleteDoctorById = asyncHandler(async (req, res) => {
  const result = await deleteDoctorServiceById(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Doctor deleted successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 * @description       Update doctor by id
 * @apiMethod         PATCH
 *
 * @apiRoute          /api/v1/doctors/:id
 * @apiAccess         Private (Admin Role)
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiBody           { name : string , email : string , specialty : string , degree : string }
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   Could not find the doctor.
 */

export const updateDoctorById = asyncHandler(async (req, res) => {
  const result = await updateDoctorServiceById(id, req.body);
  successResponse(res, {
    statusCode: 200,
    message: "Doctor updated successfully.",
    payload: {
      data: result,
    },
  });
});

/**
 * @description       Get doctor by id
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/doctors/:id
 * @apiAccess         Public
 *
 * @apiParams         [ id = string ]     required
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )   Could not find the doctor.
 */

export const getDoctorById = asyncHandler(async (req, res) => {
  const result = await getDoctorByIdService(req.params.id);

  successResponse(res, {
    statusCode: 200,
    message: "Doctor fetched successfully.",
    payload: {
      data: result,
    },
  });
});
