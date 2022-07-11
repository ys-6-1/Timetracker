/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//  renameColumn
exports.up = function (knex) {
  return knex.schema.alterTable("user", function (table) {
    table.renameColumn("fisrt_name", "first_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("user", function (table) {
    table.renameColumn("first_name", "fisrt_name");
  });
};
