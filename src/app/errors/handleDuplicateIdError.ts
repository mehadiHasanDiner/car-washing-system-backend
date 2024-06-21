import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDuplicateIdIdError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);

  const getMessage = match && match[1];

  const errorSources: TErrorMessages = [
    {
      path: "",
      message: `${getMessage} is already exists`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid Id",
    errorSources,
  };
};

export default handleDuplicateIdIdError;
