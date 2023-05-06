import { omit, get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import config from "config";
import userModel, { User } from "../models/userModel";
import { excludedFields } from "../controllers/authController";
import { signJwt } from "../utils/jwt";
import { DocumentType } from "@typegoose/typegoose";
import redisClient from "../utils/connectRedis";

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// UpdateRole service
export const findAndUpdateUser = async (
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions
) => {
  return await userModel.findOneAndUpdate(query, update, options);
};

// Delete service
export const findOneAndDeleteUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  const user = await userModel.findOneAndDelete(query, options).lean();
  return omit(user, excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

export const findUsers = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.find(query, {}, options);
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt({ sub: user._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
  });

  // Sign the refresh token
  const refresh_token = signJwt({ sub: user._id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m`,
  });

  // Create a Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: 86400,
  });

  // Return access token
  return { access_token, refresh_token };
};
