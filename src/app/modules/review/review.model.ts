import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
export const ReviewModel = model<TReview>("Review", reviewSchema);
