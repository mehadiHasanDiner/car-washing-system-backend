import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constants";
import { TUserRoles } from "./user.interface";

const router = express.Router();

router.get(
  "/users",
  auth(USER_ROLE.admin as TUserRoles as TUserRoles),
  UserControllers.getAllUser
);

router.get(
  "/:email",
  auth(USER_ROLE.admin as TUserRoles, USER_ROLE.user as TUserRoles),
  UserControllers.getSingleUserInfo
);

router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser
);

router.post(
  "/create-admin/:userId",
  auth(USER_ROLE.admin as TUserRoles),
  UserControllers.createAdmin
);

router.patch(
  "/update-profile/:userId",
  auth(USER_ROLE.admin as TUserRoles, USER_ROLE.user as TUserRoles),
  UserControllers.updateUser
);

router.post(
  "/login",
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUserByEmailPassword
);

export const UserRoutes = router;
