import { RequestHandler } from "express";
import createError from 'http-errors';

import { userModel } from "../models/user.model";

export const createUser: RequestHandler = async(req, res, next) => {
  try {
    const {name, email, password, role} = req.body;
    const userExist = await userModel.findOne({email}).lean();
    if( userExist ) throw createError.Conflict('Email already use !');
    const user = await userModel.create({name, email, password, role });
    res.status(200).json({message: "User created successfully", user });
  } catch (error) {
    next(error)
  }
}

export const userLogin: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req;
    res.send({ message: "User Successfully Logged....", user });
  } catch (error) {
    next(error);
  }
};
