import { Router } from "express";
import passport from "passport";

import * as userController from "../controllers/user.controller";
import { checkRole } from "../middlewares/auth.middleware";
import { validate } from "express-validation";
import {
  deleteUserById,
  fetchUserById,
  updateUserById,
} from "../validation/user.validation";

const userRouter = Router();

userRouter.get(
  "/show",
  passport.authenticate("jwt", { session: false }),
  checkRole(["user", "admin"]),
  userController.fetchAllUser
);

userRouter.get(
  "/:userId",
  validate(fetchUserById),
  passport.authenticate("jwt", { session: false }),
  checkRole(["user", "admin"]),
  userController.fetchById
);

userRouter.put(
  "/:userId",
  validate(updateUserById),
  passport.authenticate("jwt", { session: false }),
  checkRole(["user", "admin"]),
  userController.updateUserById
);

userRouter.delete(
  "/:userId",
  validate(deleteUserById),
  passport.authenticate("jwt", { session: false }),
  checkRole(['admin']),
  userController.deleteUserById
);

export default userRouter;
