/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("timer", function (table) {
    table.increments("id").primary();

    table.string("name", 64).notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("action.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.integer("first_range").notNullable();
    table.integer("second_range");
    table.integer("thid_range");
    table.integer("round_count");
    table.boolean("automatic_break");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("timer");
};
