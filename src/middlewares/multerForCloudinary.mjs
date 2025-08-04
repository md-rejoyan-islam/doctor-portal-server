import multer from "multer";

// multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000000) + "-" + file.fieldname
    );
  },
});

const storageForDoctor = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000000) + "-" + file.fieldname
    );
  },
});

// multer for doctor
export const doctorPhotoUpload = multer({ storage: storageForDoctor }).single(
  "photo"
);
export const userPhotoUpload = multer({ storage }).single("photo");
