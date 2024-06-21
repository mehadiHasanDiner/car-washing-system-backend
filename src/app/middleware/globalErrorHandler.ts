import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorMessages } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateIdIdError from "../errors/handleDuplicateIdError";
import AppError from "../errors/AppErrors";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorMessages: TErrorMessages = [
    {
      path: "",
      message: "Something went wrong !",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrorResponse = handleZodError(err);
    statusCode = simplifiedErrorResponse?.statusCode;
    message = simplifiedErrorResponse?.message;
    errorMessages = simplifiedErrorResponse?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedErrorResponse = handleValidationError(err);
    statusCode = simplifiedErrorResponse?.statusCode;
    message = simplifiedErrorResponse?.message;
    errorMessages = simplifiedErrorResponse?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedErrorResponse = handleCastError(err);
    statusCode = simplifiedErrorResponse?.statusCode;
    message = simplifiedErrorResponse?.message;
    errorMessages = simplifiedErrorResponse?.errorSources;
  } else if (err.code === 11000) {
    const simplifiedErrorResponse = handleDuplicateIdIdError(err);
    statusCode = simplifiedErrorResponse?.statusCode;
    message = simplifiedErrorResponse?.message;
    errorMessages = simplifiedErrorResponse?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    error: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
