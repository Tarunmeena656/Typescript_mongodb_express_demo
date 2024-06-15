/**
 * Import Modules
 */
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import { config } from "dotenv";

/**
 * Import Utilities
 */
import indexRouter from "../routes/index.route";
import {
  mainErrorHandler,
  notFoundHandler,
} from "../middlewares/error.middleware";
import "../middlewares/auth.middleware";
config();

/*Middleware */
const app = express();

app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
app.use(indexRouter);

app.use(notFoundHandler);
app.use(mainErrorHandler);

export default app;
