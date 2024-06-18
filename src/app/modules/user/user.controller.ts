import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserServices.createAdminIntoDB(user);
    res.status(200).json({
      success: true,
      message: "Admin is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      data: err,
    });
  }
};

export const UserControllers = {
  createAdmin,
};
