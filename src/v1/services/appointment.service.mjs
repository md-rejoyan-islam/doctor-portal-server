import appointmentModel from "../../models/appointment.model.mjs";
import filterQuery from "../../utils/filterQuery.mjs";
import pagination from "../../utils/pagination.mjs";

/**
 * @description get all appointments service
 */
export const getAllAppointmentsService = async (req, searchFields) => {
  // query filter
  const {
    queries: { skip, limit, fields, sortBy },
    filters,
  } = filterQuery(req, searchFields);

  // find appointments data
  const appointments = await appointmentModel
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy);

  // if no user found
  if (!appointments.length) {
    throw createError(404, "Could not find any appointments.");
  }

  // pagination object
  const paginationObject = await pagination({
    limit,
    page: req.query.page,
    skip,
    model: appointmentModel,
    filters,
  });

  return {
    appointments,
    pagination: paginationObject,
  };
};
