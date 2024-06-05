import asyncHandler from "express-async-handler";
import doctorModel from "../../models/doctor.model.mjs";
import createError from "http-errors";
import { successResponse } from "../../helper/responseHandler.mjs";
import {
  deleteCloudinaryImage,
  doctorUploadToCloud,
} from "../../middlewares/cloudinaryCloud.mjs";

/**
 * @description get all doctors
 *
 * @apiMethod         GET
 *
 * @apiRoute          /api/v1/doctors
 * @apiAccess         Public
 *
 * @apiSuccess        { success : true , message , data }
 * @apiFailed         { success : false, error : { status : code , message} }
 * @apiError          ( Not Found 404 )  Currently there are no doctors available.
 */
export const getAllDoctors = asyncHandler(async (req, res) => {
  const result = await doctorModel.find().lean();

  if (!result.length) {
    throw createError(404, "Currently there are no doctors available.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "All doctors fetched successfully.",
    payload: {
      data: result,
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
  const { name, email, specialty, degree } = req.body;

  // existing doctor check
  const doctor = await doctorModel.exists({ email });
  if (doctor) {
    throw createError(400, "Doctor already exists.");
  }

  if (!name || !email || !specialty || !degree) {
    throw createError(400, "Please provide all required fields.");
  }

  const photo = req.file.path;
  if (!photo) {
    throw createError(400, "Please provide a photo.");
  }

  const photoUrl = await doctorUploadToCloud(photo);

  if (!photoUrl) {
    throw createError(500, "Could not upload image to cloudinary.");
  }

  const result = await doctorModel.create({
    ...req.body,
    photo: photoUrl,
  });

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
  const { id } = req.params;

  const result = await doctorModel.findByIdAndDelete(id);

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }
  if (result?.photo) {
    const publicId = result.photo.split("/").pop().split(".")[0];

    await deleteCloudinaryImage(`doctor-portal/doctors/${publicId}`);
  }

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
  const { id } = req.params;

  const result = await doctorModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }

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
  const { id } = req.params;

  const result = await doctorModel.findById(id);

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }

  successResponse(res, {
    statusCode: 200,
    message: "Doctor fetched successfully.",
    payload: {
      data: result,
    },
  });
});
