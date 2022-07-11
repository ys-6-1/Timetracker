/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("daily", function (table) {
    table.increments("id").primary();

    table.date("date").notNullable();
    table.string("interval");
    table
      .integer("action_id")
      .unsigned()
      .notNullable()
      .references("action.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable(daily);
};
