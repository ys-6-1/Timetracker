const knex = require("../knex");
const TEMP_TABLE = "temp_action";
const CATEGORY_TABLE = "category";

module.exports = {
  // async getAll(limit = 10, category) {
  //   const list = await knex
  //     .select()
  //     .from(TEMP_TABLE)
  //     .modify(function (queryBuilder) {
  //       if (category) queryBuilder.where("category_id", "=", category);
  //     })
  //     .orderBy("id", "desc")
  //     .limit(limit);
  //   return { list };
  // },

  async getAll(limit = 10, req) {
    const result = await knex
      .select(
        "temp_action.date",
        "temp_action.action_id",
        "temp_action.duration",
        "category.title",
        "temp_action.id",
        "temp_action.category_id"
      )
      .from(TEMP_TABLE)
      .join(CATEGORY_TABLE, "category.id", "temp_action.category_id")
      .where("temp_action.user_id", "=", req.session.passport.user)
      .orderBy("temp_action.date", "desc")
      .limit(limit);
    return result;
  },

  getById(id) {
    return knex.select().from(TEMP_TABLE).where({ id }).first();
  },

  async create(action, category_id) {
    const count = await knex
      .select()
      .from(TEMP_TABLE)
      .where("category_id", "=", category_id)
      .count();

    if (count[0].count >= 5) {
      const idArr = await knex(TEMP_TABLE)
        .min("id")
        .where("category_id", "=", category_id);

      const id = idArr[0].min;

      await knex(TEMP_TABLE).where({ "temp_action.id": id }).del();
    }
    return knex(TEMP_TABLE).insert(action);
  },

  update(update, id) {
    return knex(TEMP_TABLE).where({ id }).update(update);
  },

  remove(id) {
    return knex(TEMP_TABLE).where({ id }).del();
  },
};
