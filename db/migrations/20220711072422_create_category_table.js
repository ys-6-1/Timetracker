/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("category", function (table) {
    table.increments("id").primary();
    table.string("title", 32).notNullable().index();
    table.string("description", 64);
    table
      .integer("user_id")
      .unsigned()
      .references("user.id")
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
  knex.schema.dropTable("category");
};
