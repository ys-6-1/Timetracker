/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.string("email").unique;
    table.string("password");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("email");
    table.dropColumn("password");
    table.string("first_name");
    table.string("last_name");
  });
};
