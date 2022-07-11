/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("action", async (table) => {
    await table
      .integer("category_id")
      .unsigned()
      .references("category.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    await table.string("category_id").alter({ alterType: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("action", (table) => {
    table.dropColumn("category_id");
  });
};
