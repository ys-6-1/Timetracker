/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const today = new Date();
const yesterday = new Date(today);
const twoDaysBefore = new Date(today);

yesterday.setDate(yesterday.getDate() - 1);
twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("temp_action").del();
  await knex.raw("ALTER SEQUENCE temp_action_id_seq RESTART WITH 10");
  await knex("temp_action").insert([
    {
      id: 1,
      category_id: 1,
      user_id: 1,
      duration: 1000,
      date: twoDaysBefore.toISOString(),
      action_id: 1,
    },
    {
      id: 2,
      category_id: 3,
      user_id: 2,
      duration: 2000,
      date: twoDaysBefore.toISOString(),
      action_id: 2,
    },
    {
      id: 3,
      category_id: 2,
      user_id: 2,
      duration: 2000,
      date: yesterday.toISOString(),
      action_id: 3,
    },
    {
      id: 4,
      category_id: 4,
      user_id: 3,
      duration: 2000,
      date: today.toISOString(),
      action_id: 4,
    },
    {
      id: 5,
      category_id: 2,
      user_id: 1,
      duration: 2000,
      date: today.toISOString(),
      action_id: 5,
    },
    {
      id: 6,
      category_id: 1,
      user_id: 1,
      duration: 1000,
      date: twoDaysBefore.toISOString(),
      action_id: 1,
    },
  ]);
};
