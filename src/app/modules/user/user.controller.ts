import httpStatus from "http-status";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAllUser = catchAsync(async (req, res) => {
  const user = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: user,
  });
});

const getSingleUserInfo = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User info retrieved successfully",
    data: user,
  });
});

const createUser = catchAsync(async (req, res) => {
  const newUser = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: { token: newUser },
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const id = req?.params?.userId;
  const result = await UserServices.createAdminIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: { token: result },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const id = req?.params?.userId;
  const result = await UserServices.updateUserIntoDB(
    req.body,
    req.user.role,
    id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Updated successfully",
    data: result,
  });
});

const loginUserByEmailPassword = catchAsync(async (req, res) => {
  const loggedInUserData = await UserServices.loginUserWithEmailPasswordIntoDB(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: { token: loggedInUserData },
  });
});

export const UserControllers = {
  getAllUser,
  getSingleUserInfo,
  createUser,
  createAdmin,
  updateUser,
  loginUserByEmailPassword,
};
