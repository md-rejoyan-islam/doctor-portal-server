import app from "./app/index.mjs";
import { hostname, port } from "./app/secret.mjs";
import { logger } from "./helper/logger.mjs";

// app listen
app.listen(port, async () => {
  try {
    logger.info(
      `server is running on http://localhost:${port} or http://${hostname}:${port}`
    );
  } catch (err) {
    logger.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if DB connection fails
  }
});
