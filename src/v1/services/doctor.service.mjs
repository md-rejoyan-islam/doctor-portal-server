import checkMongoID from "../../helper/checkMongoId.mjs";
import { doctorUploadToCloud } from "../../middlewares/cloudinaryCloud.mjs";
import doctorModel from "../../models/doctor.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";
import pagination from "../../utils/pagination.mjs";

// get all doctors
export const getAllDoctorsService = async (req, secure_url) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find doctors data
  const doctors = await doctorModel
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy)
    .lean();

  // if no doctor found
  if (!doctors.length) {
    throw createError(404, "Currently there are no doctors available.");
  }

  // pagination object
  const paginationObject = await pagination({
    limit,
    page: req.query.page,
    skip,
    model: doctorModel,
    filters,
  });

  return {
    doctors,
    pagination: paginationObject,
  };
};

// create doctor service
export const createDoctorService = async (req) => {
  // existing doctor check
  const doctor = await doctorModel.exists({ email });

  if (doctor) {
    throw createError(400, "Doctor already exists with this email.");
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

  return result;
};

// delete doctor by id service
export const deleteDoctorServiceById = async (id) => {
  const result = await doctorModel.findByIdAndDelete(id);

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }
  if (result?.photo) {
    const publicId = result.photo.split("/").pop().split(".")[0];

    await deleteCloudinaryImage(`doctor-portal/doctors/${publicId}`);
  }

  return result;
};

// update doctor by id service
export const updateDoctorServiceById = async (id, data) => {
  checkMongoID(id);

  const result = await doctorModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }

  return result;
};

// get doctor by id service
export const getDoctorByIdService = async (id) => {
  checkMongoID(id);

  const result = await doctorModel.findById(id).lean();

  if (!result) {
    throw createError(404, "Could not find the doctor.");
  }

  return result;
};
