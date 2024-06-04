import mongoose from "mongoose";
import { mongoURL } from "../app/secret.mjs";
import { logger, errorLogger } from "../helper/logger.mjs";

const mongoDBConnection = async (options = {}) => {
  try {
    const connect = await mongoose.connect(mongoURL, options);

    logger.info(`mongoDB connected successfully to ${connect.connection.name}`);

    mongoose.connection.on("error", (error) => {
      errorLogger.error(error);
    });
  } catch (error) {
    errorLogger.error(error);
  }
};

export default mongoDBConnection;
