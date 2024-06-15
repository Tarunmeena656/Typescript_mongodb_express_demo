import Joi from "joi";

export const createPost = {
  body: Joi.object({
    title: Joi.string().required().label(" title is required"),
    description: Joi.string().required().label("description required"),
  }),
};

export const fetchPostById = {
  params: Joi.object({
    postId: Joi.string().required().label("postId required"),
  }),
};

export const updatePostById = {
  params: Joi.object({
    postId: Joi.string().required().label("user required"),
  }),
  body: Joi.object({
    title: Joi.string().required().label(" title required"),
    description: Joi.string().required().label("description required"),
  }),
};
