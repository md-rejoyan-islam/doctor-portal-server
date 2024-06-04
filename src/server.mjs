import app from "./app/index.mjs";
import mongoDBConnection from "./config/db.mjs";
import { hostname, port } from "./app/secret.mjs";
import { errorLogger, logger } from "./helper/logger.mjs";

// app listen
app.listen(port, () => {
  mongoDBConnection();
  logger.info(
    `server is running on http://localhost:${port} or http://${hostname}:${port}`
  );
});

// error handling for unhandledRejection
process.on("unhandledRejection", (error) => {
  errorLogger.error(error);
  process.exit(1);
});
// error handling for uncaughtException
process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});
