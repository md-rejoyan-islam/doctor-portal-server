import cloudinary from "../config/cloudinary.mjs";

// product image upload to cloudinary
export const doctorUploadToCloud = async (file_path) => {
  const data = await cloudinary.uploader.upload(file_path, {
    folder: "doctor-portal/doctors",
    use_filename: true,
  });
  return data.secure_url;
};

// delete image from cloudinary
export const deleteCloudinaryImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error("Could not delete image from cloudinary.");
  }
};
