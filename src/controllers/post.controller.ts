import { RequestHandler } from "express";
import createError from "http-errors";

import { postModel } from "../models/post.model";
import { IUser } from "../models/user.model";
import { ObjectId } from "mongodb";

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { _id } = req.user as IUser;
    const post = await postModel.create({ title, description, postBy: _id });
    res.send({ message: "Post created successfully", post });
  } catch (error) {
    next(error);
  }
};

export const fetchAllPost: RequestHandler = async (req, res, next) => {
  try {
    const posts = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postBy",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $project: {
          name: { $first: "$posts.name" },
          email: { $first: "$posts.email" },
          active: { $first: "$posts.active" },
          role: { $first: "$posts.role" },
          title: 1,
          description: 1,
        },
      },
    ]);
    res.send({ message: "Fetched All post.", posts });
  } catch (error) {
    next(error);
  }
};

export const fetchPostById: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postModel.aggregate([
      { $match: { _id: new ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          localField: "postBy",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $project: {
          name: { $first: "$posts.name" },
          email: { $first: "$posts.email" },
          active: { $first: "$posts.active" },
          role: { $first: "$posts.role" },
          title: 1,
          description: 1,
        },
      },
    ]);
    if (!post) throw createError.NotFound("Post not found...");
    res.send({ message: "Successfully fetched.", post });
  } catch (error) {
    next(error);
  }
};

export const updatePostById: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, description } = req.body;

    let post = await postModel.findById(postId).lean();

    if (!post) throw createError.NotFound("Post not found...");
    let payload = { title, description };
    
    post = await postModel.findByIdAndUpdate(
      { _id: postId },
      { $set: payload },
      { new: true }
    );

    res.send({ message: "Successfully updated.", post });
  } catch (error) {
    next(error);
  }
};
