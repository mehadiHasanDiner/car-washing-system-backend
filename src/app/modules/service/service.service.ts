import httpStatus from "http-status";
import AppError from "../../errors/AppErrors";
import { ServiceModel } from "./service.model";
import { TService } from "./service.interface";

const createServiceIntoDB = async (payload: TService) => {
  const result = ServiceModel.create(payload);
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = ServiceModel.findById(id);
  return result;
};

const getAllServiceFromDB = async () => {
  const result = await ServiceModel.find();
  return result;
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
