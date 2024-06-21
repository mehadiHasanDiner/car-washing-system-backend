import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppErrors";
import { USER_ROLE } from "../modules/user/user.constants";
import httpStatus from "http-status";

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log({ token });

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no token or invalid"
      );
    }

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );

    const { role, email } = decoded as JwtPayload;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User is not found");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route"
      );
    }

    // console.log(req.body);

    next();
  });
};

export default auth;
