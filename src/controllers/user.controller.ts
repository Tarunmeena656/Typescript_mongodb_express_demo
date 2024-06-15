import { RequestHandler } from "express";
import createError from "http-errors";

import { IUser, USER_ROLES, userModel } from "../models/user.model";
import { ObjectId } from "mongodb";

export const fetchAllUser: RequestHandler = async (req, res, next) => {
  try {
    const users = await userModel
      .find({ active: true })
      .select("-password -deletedAt")
      .lean();
    res.send({ message: "Fetched All Users.", users });
  } catch (error) {
    next(error);
  }
};

export const fetchById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).select("-password").lean();
    if (!user) throw createError.NotFound("User not found...");
    res.send({ message: "Successfully fetched.", user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email } = req.body;
    let user = await userModel.findById(userId).select("-password").lean();
    if (!user) throw createError.NotFound("User not found...");
    let payload = { name, email };
    user = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { payload } },
      { new: true }
    );
    res.send({ message: "Successfully updated.", user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role: userRole, _id: loggedUser } = req.user as IUser;
    if (USER_ROLES.ADMIN !== userRole)
      throw createError.Unauthorized(
        "You have not sufficient permission to delete any user !"
      );
    const user = await userModel.findById(new ObjectId(userId)).lean();
    if (user?.active == false)
      throw createError.NotFound("User already deleted.");
    if (!user) throw createError.NotFound("User not found !");
    await userModel.findByIdAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { deletedAt: new Date(), active: false, deletedBy: loggedUser } },
      { new: true }
    );
    res.send({ message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};
