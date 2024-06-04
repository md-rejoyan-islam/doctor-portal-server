import asyncHandler from "express-async-handler";
import doctorModel from "../../models/doctor.model.mjs";
import createError from "http-errors";
import { successResponse } from "../../helper/responseHandler.mjs";
import {
  deleteCloudinaryImage,
  doctorUploadToCloud,
} from "../../middlewares/cloudinaryCloud.mjs";

// get all doctors
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

// create doctor
export const createDoctor = asyncHandler(async (req, res) => {
  const { name, email, specialty } = req.body;

  // existing doctor check
  const doctor = await doctorModel.exists({ email });
  if (doctor) {
    throw createError(400, "Doctor already exists.");
  }

  if (!name || !email || !specialty) {
    throw createError(400, "Please provide all required fields.");
  }

  const photo = req.file.path;
  if (!photo) {
    throw createError(400, "Please provide a photo.");
  }

  const photoUrl = await doctorUploadToCloud(photo);

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

// delete doctor
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
