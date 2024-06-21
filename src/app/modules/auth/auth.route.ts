import express, { NextFunction, Request, Response } from "express";
import { AuthControllers } from "./auth.controller";


const router = express.Router();

router.post("/signup", AuthControllers.signUp);

router.post("/login", AuthControllers.login);

export const AuthRoutes = router;
// 6 25:04
