import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const ReviewModel = model<TReview>("Review", reviewSchema);
