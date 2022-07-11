/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("timer", function (table) {
    table.renameColumn("thid_range", "third_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("user", function (table) {
    table.renameColumn("third_name", "thid_range");
  });
};
