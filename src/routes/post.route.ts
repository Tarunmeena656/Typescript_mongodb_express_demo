import { Router } from "express";

import * as postController from "../controllers/post.controller";
import passport from "passport";
import { validate } from "express-validation";
import { createPost, fetchPostById, updatePostById } from "../validation/post.validation";
import { checkRole } from "../middlewares/auth.middleware";

const postRouter = Router();

postRouter.post(
  "/",
  validate(createPost),
  checkRole(["user", "admin"]),
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

postRouter.get(
  "/allpost",
  checkRole(["user", "admin"]),
  passport.authenticate("jwt", { session: false }),
  postController.fetchAllPost
);

postRouter.get(
  "/:postId",
  checkRole(["user", "admin"]),
  validate(fetchPostById),
  passport.authenticate("jwt", { session: false }),
  postController.fetchPostById
);

postRouter.put(
  "/:postId",
  checkRole(["user", "admin"]),
  validate(updatePostById),
  passport.authenticate("jwt", { session: false }),
  postController.updatePostById
);

export default postRouter;
