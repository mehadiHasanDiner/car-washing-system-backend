import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import { ServiceModel } from "./service.model";
import { TService } from "./service.interface";
import { SlotModel } from "../slot/slot.model";
import { Types } from "mongoose";

type TSlot = {
  _id: Types.ObjectId;
  startTime: string;
  endTime: string;
  isBooked: string;
};

type TSlotData = {
  date: string;
  slots: TSlot[];
};

const createServiceIntoDB = async (payload: TService) => {
  const result = ServiceModel.create(payload);
  return result;
};

const getAllServiceFromDB = async (query: Record<string, unknown>) => {
  const filteredQuery = { ...query };
  const removableKeys = ["name", "sort", "priceRange"];

  removableKeys.forEach((key) => {
    delete filteredQuery[key];
  });

  const filterQuery = ServiceModel.find(filteredQuery);
  let name: string = "";
  if (query?.name) {
    name = query?.name as string;
  }
  const searchQuery = filterQuery.find({
    name: { $regex: name, $options: "i" },
  });

  const priceRange = query?.priceRange
    ? (query.priceRange as string).split(",")
    : null;

  const result = await searchQuery
    .find({
      ...(priceRange && {
        price: {
          $gte: Number(priceRange[0]),
          $lte: Number(priceRange[1]),
        },
      }),
      // Add other conditions here if needed
    })
    .sort((query?.sort as string) ? (query?.sort as string) : "-createdAt");
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const slots = await SlotModel.find({ service: id });

  const transformedSlots: TSlotData[] = slots.reduce<TSlotData[]>(
    (acc, current) => {
      const existingEntry = acc.find((entry) => entry.date === current.date);

      const slot: TSlot = {
        _id: new Types.ObjectId(current._id),
        startTime: current.startTime,
        endTime: current.endTime,
        isBooked: current.isBooked,
      };

      if (existingEntry) {
        existingEntry.slots.push(slot);
      } else {
        acc.push({
          date: current.date,
          slots: [slot],
        });
      }

      return acc;
    },
    []
  );

  const service = await ServiceModel.findById(id);
  return {
    service,
    slots: transformedSlots,
  };
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const service = await ServiceModel.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service Not Found by this id");
  }

  const result = await ServiceModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await ServiceModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getSingleServiceFromDB,
  getAllServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
