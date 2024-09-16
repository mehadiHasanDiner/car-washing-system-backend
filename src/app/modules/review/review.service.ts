import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

export const getReviewFromDB = async (limit?: number, page?: number) => {
  const currentPage = (page || 1) - 1;
  const result = await ReviewModel.find()
    .populate("user")
    .sort({ createdAt: -1 })
    .skip(currentPage * (limit || 2))
    .limit(limit || 2);
  const totalDoc = await ReviewModel.countDocuments();

  return { totalDoc, result };
};
export const postReviewIntoDB = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  return result;
};

const ReviewServices = {
  postReviewIntoDB,
  getReviewFromDB,
};

export default ReviewServices;
