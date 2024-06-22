import express from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";
import { ServiceControllers } from "./service.controller";
import { ServiceValidations } from "./service.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getSingleService);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceValidationSchema),

  ServiceControllers.updateService
);

router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);

export const ServiceRoutes = router;
