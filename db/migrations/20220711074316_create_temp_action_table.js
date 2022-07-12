/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("temp_action", function (table) {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .references("user.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .integer("category_id")
      .unsigned()
      .references("category.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.integer("duration").defaultTo(0);
    table.timestamp("date", { useTz: true }).notNullable();
    table.timestamps(true, true);

    table
      .integer("action_id")
      .unsigned()
      .references("action.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
