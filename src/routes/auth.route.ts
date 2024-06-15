import passport from "passport";
import { Router } from "express";
import { validate } from "express-validation";

import * as authController from "../controllers/auth.controller";
import { createUser, userLogin } from "../validation/user.validation";

const authRouter = Router();

authRouter.post("/signup", validate(createUser), authController.createUser);

authRouter.post(
  "/login",
  validate(userLogin),
  passport.authenticate("local", { session: false }),
  authController.userLogin
);

export default authRouter;
