/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("action", function (table) {
    table
      .timestamp("date", { useTz: true })
      .notNullable()
      .alter({ alterType: true, alterNullable: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("action", function (table) {
    table.date("date").alter({ alterType: true, alterNullable: true });
  });
};
