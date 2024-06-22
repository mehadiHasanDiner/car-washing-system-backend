import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import { ServiceModel } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const createSlotIntoDB = async (payload: TSlot) => {
  const service = await ServiceModel.findById(payload?.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "No Service found in this id");
  }
  const serviceTimeDuration = service?.duration;
  const startTimeString = payload?.startTime;
  const endTimeString = payload?.endTime;

  const startTimeInMins =
    Number(startTimeString.split(":")[0]) * serviceTimeDuration;
  const endTimeInMins =
    Number(endTimeString.split(":")[0]) * serviceTimeDuration;

  const totalTimeDuration = endTimeInMins - startTimeInMins;

  const numberOfSlots = totalTimeDuration / serviceTimeDuration;

  // generate slots

  const timeIntervals: { startTime: string; endTime: string }[] = [];
  for (let i = 0; i < numberOfSlots; i++) {
    const startTime =
      (Number(startTimeString.split(":")[0]) + i).toString() + ":00";
    const endTime =
      (
        Number(endTimeString.split(":")[0]) -
        (numberOfSlots - 1) +
        i
      ).toString() + ":00";

    timeIntervals.push({ startTime, endTime });
  }

  const slots = timeIntervals.map((time) => {
    return {
      service: payload?.service,
      date: payload?.date,
      startTime: time.startTime,
      endTime: time.endTime,
    };
  });

  const result = await SlotModel.create(slots);
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const queryObj: Partial<{ service: string; date: string }> = {};
  if (query?.date) {
    queryObj.date = query.date as string;
  }

  if (query?.serviceId) {
    queryObj.service = query.serviceId as string;
  }

  const result = await SlotModel.find(queryObj);

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFromDB,
};
