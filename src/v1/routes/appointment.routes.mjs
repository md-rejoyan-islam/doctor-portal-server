import express from "express";
import {
  getAllAppointments,
  updateAppointment,
} from "../controllers/appointment.controllers.mjs";
import { isLoggedOut } from "../../middlewares/verify.mjs";

const appointmentRouter = express.Router();

appointmentRouter.route("/").get(getAllAppointments);
appointmentRouter.route("/update").get(updateAppointment);

export default appointmentRouter;
