import ReviewServices from "./review.service";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

export const postReview = catchAsync(async (req, res) => {
  const { body } = req;
  const auth = req.user as JwtPayload;

  const result = await ReviewServices.postReviewIntoDB({
    ...body,
    user: auth._id,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: result,
    success: true,
    message: "User Review created successfully",
  });
});
export const getReviews = catchAsync(async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page || 1;
  const { result, totalDoc } = await ReviewServices.getReviewFromDB(
    Number(limit),
    Number(page)
  );
  res.json({
    data: result,
    totalDoc,
    success: true,
    message: "All reviews get Successfully",
  });
});
