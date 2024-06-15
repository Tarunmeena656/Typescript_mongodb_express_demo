/**
 * Import Utilities
 */
import { APP_CONFIG } from "./config/index";
import connectDatabase from "./utils/connection";

const port = APP_CONFIG.PORT;

import { createServer } from "http";
import app from "./app/app";

const server = createServer(app);
connectDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log("===============================================")
      console.log(`🚀 Server is running on http://localhost:${port} 🚀`);
      console.log("===============================================")
    });
  })
  .catch((error) => {
    console.log(error);
  });
