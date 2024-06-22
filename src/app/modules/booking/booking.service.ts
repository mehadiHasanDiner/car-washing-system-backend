import { JwtPayload } from "jsonwebtoken";
import { TBookingForUser } from "./booking.interface";
import { UserModel } from "../user/user.model";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";
import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { BookingModel } from "./booking.model";

const createBookingIntoDB = async (
  payload: TBookingForUser,
  user: JwtPayload
) => {
  const userData = await UserModel.findOne({
    email: user?.email,
    role: user?.role,
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer does not exists");
  }

  const serviceData = await ServiceModel.findById(payload?.serviceId);

  if (!serviceData) {
    throw new AppError(httpStatus.NOT_FOUND, "Service does not exists");
  }
  const slotData = await SlotModel.findOne({
    _id: payload?.slotId,
    service: payload?.serviceId,
  });

  if (!slotData) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot does not exists");
  }
  if (slotData?.isBooked === "booked") {
    throw new AppError(httpStatus.BAD_REQUEST, "This slot is already booked");
  }
  await SlotModel.findByIdAndUpdate(payload?.slotId, {
    isBooked: "booked",
  });

  const booking = await BookingModel.create({
    customer: userData?._id,
    service: payload?.serviceId,
    slot: payload?.slotId,
    vehicleType: payload?.vehicleType,
    vehicleBrand: payload?.vehicleBrand,
    vehicleModel: payload?.vehicleModel,
    manufacturingYear: payload?.manufacturingYear,
    registrationPlate: payload?.registrationPlate,
  });

  const result = await BookingModel.findById(booking?._id)
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await BookingModel.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getUserBookingFromDB = async (user: JwtPayload) => {
  const userData = await UserModel.findOne({
    email: user?.email,
    role: user?.role,
  });

  const result = BookingModel.find({ customer: userData?._id });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getUserBookingFromDB,
  getAllBookingsFromDB,
};
