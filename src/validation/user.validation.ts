import Joi from "joi";

export const createUser = {
  body: Joi.object({
    name: Joi.string().required().label("name required"),
    email: Joi.string().email().required().label("Email required"),
    password: Joi.string().min(8).max(12).required().label("password required"),
    role: Joi.string().label("password required"),
  }),
};

export const userLogin = {
  body: Joi.object({
    email: Joi.string().email().required().label(" Email required"),
    password: Joi.string().min(8).max(12).required().label("password required"),
  }),
};

export const fetchUserById = {
  params: Joi.object({
    userId: Joi.string().required().label("UserId required"),
  }),
};
export const deleteUserById = {
  params: Joi.object({
    userId: Joi.string().required().label("UserId required"),
  }),
};

export const updateUserById = {
  params: Joi.object({
    userId: Joi.string().required().label("user required"),
  }),
  body: Joi.object({
    email: Joi.string().email().required().label(" Email required"),
    password: Joi.string().min(8).max(12).required().label("password required"),
  }),
};
