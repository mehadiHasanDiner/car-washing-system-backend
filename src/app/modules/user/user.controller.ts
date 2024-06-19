import httpStatus from "http-status";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createAdmin = catchAsync(async (req, res, next) => {
  const user = req.body;
  const result = await UserServices.createAdminIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Updated successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  updateUser,
};
