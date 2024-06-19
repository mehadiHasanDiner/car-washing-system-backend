import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

const validateRequest = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("first ..... ..");
  };
};

// will call controller function
router.post("/create-admin", validateRequest(), UserControllers.createAdmin);

export const UserRoutes = router;
