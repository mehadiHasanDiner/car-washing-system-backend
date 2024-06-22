import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";
import { isSlotBooked } from "./slot.constant";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: isSlotBooked,
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

slotSchema.pre("find", function (next) {
  this.find({ isBooked: { $ne: "booked" } });
  next();
});

export const SlotModel = model<TSlot>("Slot", slotSchema);
