const knex = require("../knex");
const ACTION_TABLE = "action";
const CATEGORY_TABLE = "category";

module.exports = {
  async getAll(limit = 10, category, req) {
    const list = await knex
      .select()
      .from(ACTION_TABLE)
      .where("user_id", "=", req.session.passport.user)
      .modify(function (queryBuilder) {
        if (category) queryBuilder.where("category_id", "=", category);
      })
      .orderBy("id", "desc")
      .limit(limit);

    const totalTimeData = await knex(ACTION_TABLE)
      .sum("duration")
      .modify(function (queryBuilder) {
        if (category) queryBuilder.where("category_id", "=", category);
      });
    const totalTime = totalTimeData[0].sum;

    const lastEngagedData = await knex(ACTION_TABLE)
      .max("date")
      .modify(function (queryBuilder) {
        if (category) queryBuilder.where("category_id", "=", category);
      });
    const lastEngaged = lastEngagedData[0].max;

    const totalDaysData = await knex(ACTION_TABLE)
      .count()
      .where("category_id", "=", category);
    const totalDays = totalDaysData[0].count;

    const startedOnData = await knex(ACTION_TABLE)
      .min("date")
      .where("category_id", "=", category);
    const startedOn = startedOnData[0].min;

    return { list, totalTime, lastEngaged, totalDays, startedOn };
  },

  async getLatest(category) {
    const list = await knex
      .select()
      .from(ACTION_TABLE)
      .where("category_id", "=", category)
      .orderBy("date", "desc")
      .first();
    return list;
  },

  async getWeekData(category, pageIndex) {
    const offset = pageIndex * 7;
    const data = await knex.raw(
      `WITH RECURSIVE cte(dt) AS (VALUES (current_date - ${offset} - 6) UNION ALL 
      SELECT dt+1 
      FROM cte WHERE dt <= current_date - ${offset} - 1)
      SELECT cte.dt, filtered.date, filtered.duration, filtered.category_id 
      FROM cte 
      LEFT JOIN (SELECT action.date, action.duration, action.category_id 
        FROM action WHERE action.category_id = ${category}::integer) 
      AS filtered 
      ON date_trunc('day', cte.dt) = date_trunc('day', filtered.date)
      ORDER BY cte.dt
      `
    );
    console.log(data.rows);
    return data.rows;
  },

  async getMonthData(category, pageIndex) {
    const offset = pageIndex * 30;
    const data = await knex.raw(
      `WITH RECURSIVE cte(dt) AS (VALUES (current_date - ${offset} - 29) UNION ALL 
      SELECT dt+1 
      FROM cte WHERE dt <= current_date - ${offset} - 1) 
      SELECT cte.dt, filtered.date, filtered.duration, filtered.category_id 
      FROM cte 
      LEFT JOIN (SELECT action.date, action.duration, action.category_id 
        FROM action WHERE action.category_id = ${category}::integer) 
      AS filtered 
      ON date_trunc('day', cte.dt) = date_trunc('day', filtered.date)
      ORDER BY cte.dt
      `
    );
    return data.rows;
  },

  async getAllSum(length, req) {
    return knex
      .select("category.title", knex.raw("SUM(action.duration)"))
      .from(CATEGORY_TABLE)
      .leftJoin(ACTION_TABLE, "category.id", "action.category_id")
      .where("action.user_id", "=", req.session.passport.user)
      .whereNotNull("action.duration")
      .modify(function (queryBuilder) {
        if (length === "Today") {
          queryBuilder.where("action.date", ">=", knex.raw("current_date - 1"));
        }
        if (length === "7 days") {
          queryBuilder.where("action.date", ">=", knex.raw("current_date - 6"));
        }
        if (length === "30 days") {
          queryBuilder.where(
            "action.date",
            ">=",
            knex.raw("current_date - 29")
          );
        }
      })
      .groupBy("category.id");
  },

  getById(id) {
    return knex.select().from(ACTION_TABLE).where({ id }).first();
  },

  create(action) {
    return knex(ACTION_TABLE)
      .insert(action)
      .returning("id")
      .then((data) => data[0].id);
  },
  update(update, id) {
    update.updated_at = new Date();
    return knex(ACTION_TABLE).where({ id }).update(update);
  },

  remove(id) {
    return knex(ACTION_TABLE).where({ id }).del();
  },
};
