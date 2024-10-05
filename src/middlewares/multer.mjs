import multer from "multer";
import {
  allowedImageTypes,
  brandImageUploadDir,
  categoryImageUploadDir,
  productImageUploadDir,
  userImageUploadDir,
  userMaxImageSize,
} from "../app/secret.mjs";

// create disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // image file size
    const fileSize = parseInt(req.headers["content-length"]);

    // doctor photo
    if (file.fieldname == "user_photo") {
      if (fileSize > userMaxImageSize) {
        return cb(new Error("Maximum image size is 400KB"));
      }
      cb(null, userImageUploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExtension = file.mimetype.split("/")[1];

  if (allowedImageTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only jpg, jpeg, png, webp files are allowed"
      ),
      false
    );
  }
};

// user photo
export const doctorMulter = multer({
  storage,
  fileFilter,
}).single("doctor_photo");
// user photo
export const userMulter = multer({
  storage,
  fileFilter,
}).single("photo");
