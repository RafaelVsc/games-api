import BadRequests from "../errors/BadRequests.js";
// import { game } from "../models/index.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, sortBy = "_id:-1" } = req.query;

    let [sortField, orderRaw] = sortBy.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    const order = orderRaw === "1" ? 1 : -1;
    const { result, allowedSortFields = ["_id"] } = req;

    if (
      isNaN(page) ||
      isNaN(limit) ||
      limit <= 0 ||
      page <= 0 ||
      !allowedSortFields.includes(sortField)
    ) {
      return next(new BadRequests("Invalid pagination or sorting parameters"));
    }
    const totalItems = await result.model.countDocuments(result.getQuery());
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages && totalItems > 0) {
      return next(new BadRequests("Requested page exceeds total pages."));
    }

    const items = await result
      .find()
      .sort({ [sortField]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      results: items,
      totalItems,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    next(error);
  }
}

export default paginate;
