/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("timer", function (table) {
    table.renameColumn("third_name", "third_range");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("user", function (table) {
    table.renameColumn("third_range", "third_name");
  });
};
