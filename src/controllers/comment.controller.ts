import { RequestHandler } from "express";
import { commentModel } from "../models/comment.model";
import { IUser } from "../models/user.model";

export const createComment: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const { _id: userId, role } = req.user as IUser;
    const commentData = await commentModel.create({ comment, post: postId, postBy: userId });
    res.send({ message: "Comment created successfully ", commentData });
  } catch (error) {
    next(error);
  }
};
