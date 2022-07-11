/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("temp_action", function (table) {
    table
      .foreign("action_id")
      .references("action.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("temp_action", function (table) {
    table.dropForeign("action_id");

    table.integer("action_id");
  });
};
