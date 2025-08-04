import fs from "fs/promises";
import asyncHandler from "express-async-handler";
import { errorLogger, logger } from "./logger.mjs";

const deleteImage = asyncHandler(async (imagePath) => {
  try {
    // default image can't be deleted
    if (imagePath.includes("/default/default_")) {
      errorLogger.error("default image can't be deleted.");
      return;
    }
    await fs.access(imagePath);
    await fs.unlink(imagePath);

    logger.info("image was deleted.");
  } catch (error) {
    errorLogger.error(error);
  }
});

export default deleteImage;
