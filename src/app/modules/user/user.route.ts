import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constants";

const router = express.Router();

router.post(
  "/create-admin",
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.createAdminValidations),
  UserControllers.createAdmin
);

router.patch(
  "/:userId",
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.updateUserValidations),
  UserControllers.updateUser
);

export const UserRoutes = router;
