/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("action", async (table) => {
    await table.dropForeign("category_id");
    await table.dropColumn("category_id");

    table
      .string("category_id")
      .unsigned()
      .notNullable()
      .references("category.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("action", async (table) => {
    await table.dropForeign("category_id");
    await table.dropColumn("category_id");

    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("category.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};
