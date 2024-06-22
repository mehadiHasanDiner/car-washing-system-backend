import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();
const router2 = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking
);
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router2.get("/", auth(USER_ROLE.user), BookingControllers.getUserBooking);

export const BookingRoutes = router;
export const BookingRoutes2 = router2;
