import app from "./app/index.mjs";
import mongoDBConnection from "./config/db.mjs";
import { hostname, port } from "./app/secret.mjs";
import { errorLogger, logger } from "./helper/logger.mjs";
import { Server } from "http";
let server = new Server(app);

// app listen
app.listen(port, () => {
  mongoDBConnection();
  logger.info(
    `server is running on http://localhost:${port} or http://${hostname}:${port}`
  );
});

// error handling for unhandledRejection
process.on("unhandledRejection", (error) => {
  if (server) {
    server.close(() => {
      // ze gula global error handlle korte pare na
      errorLogger.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
// error handling for uncaughtException
process.on("uncaughtException", (error) => {
  console.log(22);
  errorLogger.error(error);
  process.exit(1);
});

// err instanceof TypeError
