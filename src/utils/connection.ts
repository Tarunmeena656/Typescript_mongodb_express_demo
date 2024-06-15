import { connect, connection } from "mongoose";
import { APP_CONFIG } from "../config/index";

function connectDatabase() {
  return connect(APP_CONFIG.DB_URL);
}

connection.on("connected", () => {
  console.log("💥 Database connected successfully... 💥");
});

connection.on('error', () => {
  console.log(" Database connection failed..😡 ")
})

export default connectDatabase;