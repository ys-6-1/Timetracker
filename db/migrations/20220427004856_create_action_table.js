/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//  "id": 1,
//       "category_id": 1,
//       "user_id": 1,
//       "duration": 2000,
//       "created_at": "2022-04-26",
//   "updated_at": "2022-04-26"

exports.up = function (knex) {
  return knex.schema.createTable("action", function (table) {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .integer("category_id")
      .unsigned()
      .notNullable()
      .references("category.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.integer("duration").defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("action");
};
