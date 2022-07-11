/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("timer", async (table) => {
    await table.dropForeign("user_id");
    await table.dropColumn("user_id");

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("timer", async (table) => {
    await table.dropForeign("user_id");
    await table.dropColumn("user_id");

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("action.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};
