/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("id").primary();

    table.string("fisrt_name", 32);
    table.string("last_name", 32);
    table.string("user_name", 32).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("user");
};
