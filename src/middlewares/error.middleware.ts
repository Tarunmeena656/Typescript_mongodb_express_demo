import createError from "http-errors";
import { ValidationError } from "express-validation";
import { ErrorRequestHandler, RequestHandler } from "express";

function getResponseMessage(err: ValidationError) {
  let message;
  if (err.details?.body) return (message = err.details?.body[0].message);
  if (err.details?.params) return (message = err.details?.params[0].message);
  if (err.details?.query) return (message = err.details?.query[0].message);
}

export const notFoundHandler: RequestHandler = (req, res, next) => {
  return next(createError.NotFound("Resource not found"));
};

export const mainErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).send(`MESSAGE: ${getResponseMessage(err)}`);
  } else {
    const status = err.status || 500;
    const message = err.message || "Something went wrong ";
    res.status(status).send(`MESSAGE: ${message}`);
  }
};
