import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.createBookingIntoDB(req.body, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? "All bookings retrieved successfully"
      : "No Data Found",
    data: result,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.getUserBookingFromDB(user);
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? "All bookings retrieved successfully"
      : "No Data Found",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getUserBooking,
  getAllBookings,
};
