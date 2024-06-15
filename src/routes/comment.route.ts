import express from "express";
import * as commentController from "../controllers/comment.controller";
import passport from "passport";
import { validate } from "express-validation";
import { createComment } from "../validation/comment.validation";

const commentRouter = express.Router();

commentRouter.post(
  "/post/:postId/comment",
  validate(createComment),
  passport.authenticate("jwt", { session: false }),
  commentController.createComment
);

export default commentRouter;
