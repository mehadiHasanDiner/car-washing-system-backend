import mongoose from "mongoose";

export type TReview = {
  user: mongoose.Schema.Types.ObjectId;
  comment: string;
  rating: number;
};
