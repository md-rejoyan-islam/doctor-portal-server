import mongoose from "mongoose";
import { mongoURL } from "../app/secret.mjs";
import { errorLogger, logger } from "../helper/logger.mjs";

const mongoDBConnection = async (options = {}) => {
  try {
    const connect = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
      ...options,
    });

    logger.info(`mongoDB connected successfully to ${connect.connection.name}`);

    mongoose.connection.on("error", (error) => {
      errorLogger.error(error);
    });
  } catch (error) {
    errorLogger.error(error);
  }
};

export default mongoDBConnection;
