import mongoose from "mongoose";
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorMessages = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
