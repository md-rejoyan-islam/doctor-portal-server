import mongoose from "mongoose";
import { mongoURL } from "../app/secret.mjs";
import { errorLogger, logger } from "../helper/logger.mjs";

let isConnected = false; // Global flag to track the connection status

const mongoDBConnection = async (options = {}) => {
  try {
    if (isConnected) {
      logger.info("MongoDB already connected.");
      return;
    }

    const connect = await mongoose.connect(mongoURL, options);

    isConnected = connect.connections[0].readyState === 1;

    logger.info(`mongoDB connected successfully to ${connect.connection.name}`);

    mongoose.connection.on("error", (error) => {
      errorLogger.error(error);
    });
  } catch (error) {
    errorLogger.error(error);
  }
};

export default mongoDBConnection;
