import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotControllers } from "./slot.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();
const router2 = express.Router();

router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),

  SlotControllers.createSlot
);

router2.get("/availability", SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
export const SlotRoutes2 = router2;
