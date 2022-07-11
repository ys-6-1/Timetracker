const knex = require("../knex");
const USER_TABLE = "user";
const passport = require("passport");
const initializePassport = require("../passport-config");

// initializePassport(passport, (email) => {
//   return knex.select().from(USER_TABLE).where({ email });
//   // return users.find((user) => user.email === email);
// }, (id) => {
//   return knex.select().from(USER_TABLE)
// });

module.exports = {
  getAll(limit = 10) {
    return knex.select().from(USER_TABLE).limit(limit);
  },
  getById(id) {
    return knex.select().from(USER_TABLE).where({ id }).first();
  },
  async create(user) {
    const { email } = user;
    console.log(email);
    const existingUser = await knex
      .select()
      .from(USER_TABLE)
      .where({ email })
      .first();
    if (existingUser === undefined) {
      return knex(USER_TABLE).insert(user);
    } else {
      throw new Error("Account already exists");
    }
  },
  update(update, id) {
    update.updated_at = new Date();
    return knex(USER_TABLE).where({ id }).update(update);
  },
  remove(id) {
    return knex(USER_TABLE).where({ id }).del();
  },
};
