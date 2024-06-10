import express from "express";
import {
  createAppointment,
  deleteAppointmentById,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
} from "../controllers/appointment.controllers.mjs";
import { isLoggedIn } from "../../middlewares/verify.mjs";
import { authorization } from "../../middlewares/authorization.mjs";
import {
  appointmentCreateValidator,
  appointmentUpdateValidator,
} from "../../middlewares/validators/file/appointment.validator.mjs";
import runValidation from "../../middlewares/validators/validation.mjs";

const appointmentRouter = express.Router();

appointmentRouter.route("/").get(getAllAppointments).post(
  // isLoggedIn,
  // authorization("admin"),
  // appointmentCreateValidator,
  // runValidation,
  createAppointment
);
appointmentRouter
  .route("/:id")
  .get(getAppointmentById)
  .put(
    isLoggedIn,
    authorization("admin"),
    appointmentUpdateValidator,
    updateAppointmentById
  )
  .delete(isLoggedIn, authorization("admin"), deleteAppointmentById);

export default appointmentRouter;
