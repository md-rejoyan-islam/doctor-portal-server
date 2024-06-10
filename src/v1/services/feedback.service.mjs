import feedbackModel from "../../models/feedback.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";
import pagination from "../../utils/pagination.mjs";
import createError from "http-errors";

// get all feedbacks service
export const getAllFeedbacksService = async (req, searchFields) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find feedbacks data
  const feedbacks = await feedbackModel
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy);

  // if no user found
  if (!feedbacks.length) {
    throw createError(404, "Could not find any feedbacks.");
  }

  // pagination
  const paginationObject = await pagination({
    limit,
    page: req.query.page,
    skip,
    model: feedbackModel,
    filters,
  });

  return {
    feedbacks,
    pagination: paginationObject,
  };
};

// get feedback by id service
export const getFeedbackByIdService = async (id) => {
  // id validation
  checkMongoID(id);

  const feedback = await feedbackModel.findById(id).lean();

  if (!feedback) {
    throw createError(404, "Could not find any feedback.");
  }

  return feedback;
};

// create feedback service
export const createFeedbackService = async (data) => {
  const feedback = await feedbackModel.create(data);

  return feedback;
};

// delete feedback by id service
export const deleteFeedbackServiceById = async (id) => {
  checkMongoID(id);

  const feedback = await feedbackModel.findByIdAndDelete(id);

  if (!feedback) {
    throw createError(404, "Could not find any feedback.");
  }
  return feedback;
};
