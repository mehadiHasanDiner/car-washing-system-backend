import express, { NextFunction, Request, Response } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validations";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signUpValidationSchema),
  AuthControllers.signUp
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login
);

export const AuthRoutes = router;
