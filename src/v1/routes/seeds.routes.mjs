import express from "express";
import { seedsAppoinments } from "../controllers/seeds.controllers.mjs";

const seedRouter = express.Router();

seedRouter.route("/appointment").get(seedsAppoinments);

export default seedRouter;
