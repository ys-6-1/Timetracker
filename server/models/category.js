const knex = require("../knex");
const CATEGORY_TABLE = "category";

module.exports = {
  // getAll(limit = 5, page = 1, searchQuery, orderByColumn, orderByDirection) {
  //   return knex
  //     .select()
  //     .from(CATEGORY_TABLE)
  //     .modify(function (queryBuilder) {
  //       if (searchQuery)
  //         queryBuilder.where("title", "ilike", `%${searchQuery}%`);
  //     })
  //     .orderBy(orderByColumn, orderByDirection)
  //     .limit(limit)
  //     .offset((page - 1) * limit);
  // },
  // getAll(limit = 10, searchQuery) {
  //   return knex
  //     .select()
  //     .from(CATEGORY_TABLE)
  //     .modify(function (queryBuilder) {
  //       if (searchQuery)
  //         queryBuilder.where("title", "ilike", `%${searchQuery}%`);
  //     })
  //     .orderBy("id")
  //     .limit(limit);
  // },
  getById(id) {
    return knex.select().from(CATEGORY_TABLE).where({ id }).first();
  },
  create(category) {
    return knex(CATEGORY_TABLE).insert(category);
  },
  update(update, id) {
    update.updated_at = new Date();
    return knex(CATEGORY_TABLE).where({ id }).update(update);
  },
  remove(id) {
    return knex(CATEGORY_TABLE).where({ id }).del();
  },
};
