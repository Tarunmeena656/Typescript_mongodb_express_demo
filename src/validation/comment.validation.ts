import Joi from "joi";


export const createComment  = {
  params: Joi.object({
    postId : Joi.string().required().label(" post Id is missing")
  }),
  body : Joi.object({
    comment: Joi.string().required().label(" comment is missing")
  })
}