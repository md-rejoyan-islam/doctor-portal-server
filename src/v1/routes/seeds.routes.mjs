import express from "express";
import {
  seedsAppoinments,
  seedsDoctors,
} from "../controllers/seeds.controllers.mjs";

const seedRouter = express.Router();

seedRouter.route("/appointments").get(seedsAppoinments);
seedRouter.route("/doctors").get(seedsDoctors);

export default seedRouter;
