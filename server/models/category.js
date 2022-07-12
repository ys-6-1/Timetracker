const knex = require("../knex");
const CATEGORY_TABLE = "category";

module.exports = {
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
