const knex = require("../knex");
const CATEGORY_TABLE = "category";
const ACTION_TABLE = "action";

module.exports = {
  getById(id) {
    return knex.select().from(CATEGORY_TABLE).where({ id }).first();
  },
  async create(category) {
    const response = await knex(CATEGORY_TABLE).insert(category).returning("*");

    const action = {
      duration: 0,
      category_id: response[0].id,
      user_id: response[0].user_id,
      date: new Date(),
    };
    return knex(ACTION_TABLE).insert(action);
  },
  update(update, id) {
    update.updated_at = new Date();
    return knex(CATEGORY_TABLE).where({ id }).update(update);
  },
  remove(id) {
    return knex(CATEGORY_TABLE).where({ id }).del();
  },
};
