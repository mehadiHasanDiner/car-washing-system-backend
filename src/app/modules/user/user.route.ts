import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdminValidations),
  UserControllers.createAdmin
);

router.put(
  "/:userId",
  validateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);

export const UserRoutes = router;
