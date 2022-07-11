const knex = require("../knex");
const CATEGORY_TABLE = "category";
const ACTION_TABLE = "action";

module.exports = {
  async paginateCategory(req, res, next) {
    const limit = Number(req.query.limit) || 5;
    const page = Number(req.query.page) || 1;
    const { search } = req.query;
    const orderByColumn = req.query.column || "id";
    const orderByDirection = req.query.direction || "desc";
    const startIndex = (page - 1) * limit;
    const results = { page };

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }
    const tableSize = await knex(CATEGORY_TABLE).count();
    if (startIndex + limit < Number(tableSize[0].count)) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (orderByColumn !== "total_time") {
      results.result = await knex
        .select("*")
        .from(CATEGORY_TABLE)
        .leftJoin(
          knex(ACTION_TABLE)
            .select("category_id", knex.raw(`SUM(action.duration)`))
            .groupBy("category_id")
            .as("total"),
          "category.id",
          "total.category_id"
        )
        .where("category.user_id", "=", req.session.passport.user)
        .modify(function (queryBuilder) {
          if (search) queryBuilder.where("title", "ilike", `%${search}%`);
        })
        .orderBy(orderByColumn, orderByDirection)
        .limit(limit)
        .offset(startIndex);
    } else {
      results.result = await knex
        .select("*")
        .from(CATEGORY_TABLE)
        .leftJoin(
          knex(ACTION_TABLE)
            .select("action.category_id")
            .sum("action.duration")
            .groupBy("action.category_id")
            .as("total"),
          "category.id",
          "total.category_id"
        )
        .where("category.user_id", "=", req.session.passport.user)
        .modify(function (queryBuilder) {
          if (search) queryBuilder.where("title", "ilike", `%${search}%`);
        })
        .orderBy("sum", orderByDirection)
        .limit(limit)
        .offset(startIndex);
    }
    res.collection = results;
    next();
  },
};
