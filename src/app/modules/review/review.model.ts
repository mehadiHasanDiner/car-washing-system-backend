import mongoose, { Schema, Document } from "mongoose";

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
export const ReviewModel = mongoose.model<Document>("Review", reviewSchema);
