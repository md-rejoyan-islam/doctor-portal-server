/**
 * @search_URL      :      ?status=in-stock&fields=brand,price&email=a@gmail.com&sort=name,age&price[eq]=50&page=4&limit=1
 */

const filterQuery = (req, searchFields) => {
  let filters = { ...req.query };

  // sort ,page,limit exclude from filters
  const excludeFilters = ["sort", "page", "limit", "fields", "search"];
  excludeFilters.forEach((field) => delete filters[field]);

  let filterString = JSON.stringify(filters);

  /**
   *
   * @filter_search_query    :    ?price[gt]=50 & age[lt]=12 & name=joy & email=a@gmail.com
   *
   * @receive_data_format    :    { price: { gt: '50' }, age: { lt: '12' } , name: 'joy' , email: 'a@gmail.com' }
   *
   * @change_data_format     :    { "price":{"$gt":"50"}, "age":{"$lt":"12"} }
   *
   * @regex                  :    /\b(gt|gte|lt|lte|eq|neq)\b/g  ==> \b => full block check
   */

  filterString = filterString.replace(
    /\b(gt|gte|lt|lte|eq|neq)\b/g,
    (match) => `$${match}`
  );

  filters = JSON.parse(filterString);

  // full text search with regular expression
  if (req.query.search && searchFields.length) {
    const search = req.query.search;

    // _id remove from search fields with sortcut
    const index = searchFields.indexOf("_id");
    if (index > -1) {
      searchFields.splice(index, 1);
    }

    const regularExpression = { $regex: search, $options: "i" };

    filters = {
      ...filters,
      $or: [...searchFields.map((field) => ({ [field]: regularExpression }))],
    };
  }

  /***
   *
   * @query_sort             :    ?sort=name,price
   *
   * @receive_data_format    :    { sort : 'name,price' }
   *
   * @change_data_format     :    { sort : 'name price' }
   *
   */

  const queries = {};

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queries.sortBy = sortBy;
  }

  /***
   *
   * @description              :    fields use for select specific fields which we want to show or hide in response.
   *
   * @search_query_format      :    ?fields=name,email,-age
   *
   * @receive_data_format      :    { fields: 'name,email,-age'}
   *
   * @change_data_format       :    { fields: 'name email -age'}
   *
   */

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queries.fields = fields;
  }

  /***
   *
   * @search_query_format     :    ?page=4&limit=12
   *
   * @receive_data_format     :    { page: '4', limit :'12'}
   *
   */

  req.query.page = Number(req.query.page) || 1;
  req.query.limit = Number(req.query.limit) || 10;

  if (req.query.page) {
    const { page, limit } = req.query;
    const skip = (page - 1) * Number(limit);
    queries.skip = skip;
    queries.limit = Number(limit);
  }

  return { filters, queries };
};

export default filterQuery;
