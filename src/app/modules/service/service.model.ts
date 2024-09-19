import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

serviceSchema.pre("find", function () {
  this.find({ isDeleted: { $ne: true } });
});
serviceSchema.pre("findOne", function () {
  this.find({ isDeleted: { $ne: true } });
});

export const ServiceModel = model<TService>("Service", serviceSchema);
