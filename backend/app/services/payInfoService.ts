import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import paymentInfoModel, { PaymentInfo } from "../models/paymentInfoModel";

// create payinfo
export const createPayInfo = async ({
  input,
}: {
  input: Partial<PaymentInfo>;
}) => {
  return paymentInfoModel.create({ ...input });
};

// find payinfo
export const findAllPayInfo = async () => {
  return paymentInfoModel.find();
};

// update payinfo
export const findAndUpdatePayInfo = async (
  query: FilterQuery<PaymentInfo>,
  update: UpdateQuery<PaymentInfo>,
  options: QueryOptions
) => {
  return await paymentInfoModel.findOneAndUpdate(query, update, options);
};

// delete payinfo
export const findOneAndDeletePayInfo = async (
  query: FilterQuery<PaymentInfo>,
  options: QueryOptions = {}
) => {
  return await paymentInfoModel.findOneAndDelete(query, options);
};
