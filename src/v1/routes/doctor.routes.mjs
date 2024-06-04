import express from "express";
import {
  createDoctor,
  deleteDoctorById,
  getAllDoctors,
} from "../controllers/doctor.controller.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import { authorization } from "../../middlewares/authorization.mjs";
import { doctorPhotoUpload } from "../../middlewares/multerForCloudinary.mjs";

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(getAllDoctors)
  .post(isLoggedIn, authorization("admin"), doctorPhotoUpload, createDoctor);

doctorRouter.delete(
  "/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  authorization("admin"),
  deleteDoctorById
);

export default doctorRouter;
