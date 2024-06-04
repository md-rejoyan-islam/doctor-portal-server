const pagination = async ({ limit, skip, page, model, filters }) => {
  // total data count with filter
  const filterItems = await model.countDocuments(filters);

  // total data count without filter
  const totalItems = await model.countDocuments();  

  return {
    limit,
    previousPage: skip > 0 ? page - 1 : null,
    currentPage: Math.floor(skip / limit) + 1,
    nextPage: skip + limit < filterItems ? page + 1 : null,
    totalPage: Math.ceil(filterItems / limit),
    filterItems,
    totalItems,
  };
};

export default pagination;
