import catchAsync from "./../utils/catchAsync.js";
import APIFeatures from "./../utils/apiFeatures.js";
import Review from "../models/reviewModel.js";
import { NotFound } from "./../utils/error.js";
import * as factory from "../utils/handlerFactory.js";

export const getAllReviews = factory.getAll(Review);

export const getOneReview = factory.getOne(Review);

export const createReview = factory.createOne(Review);

export const updateReview = factory.updateOne(Review);

export const deleteReview = factory.deleteOne(Review);
