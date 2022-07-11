/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("category", function (table) {
    table
      .integer("timer_1")
      .unsigned()
      .references("timer.id")
      .onDelete("SET NULL")
      .onUpdate("SET NULL");

    table
      .integer("timer_2")
      .unsigned()
      .references("timer.id")
      .onDelete("SET NULL")
      .onUpdate("SET NULL");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("category", async function (table) {
    await table.dropForeign("timer_1");
    await table.dropForeign("timer_2");
    await table.dropColumn("timer_1");
    await table.dropColumn("timer_2");
  });
};
