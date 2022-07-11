/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const first = 25 * 60;
const breakTime = 15 * 60;
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("timer").del();
  await knex.raw("ALTER SEQUENCE temp_action_id_seq RESTART WITH 5");
  await knex("timer").insert([
    {
      id: 1,
      name: "pomodolo",
      user_id: 1,
      first_range: first,
      second_range: 300,
      third_range: breakTime,
      round_count: 4,
      automatic_break: true,
      automatic_repeat: false,
    },
    {
      id: 2,
      name: "half",
      user_id: 2,
      first_range: 1800,
      second_range: 300,
      third_range: null,
      round_count: null,
      automatic_break: true,
      automatic_repeat: false,
    },
    {
      id: 3,
      name: "test pomodolo",
      user_id: 2,
      first_range: 5,
      second_range: 3,
      third_range: 4,
      round_count: 4,
      automatic_break: true,
      automatic_repeat: true,
    },
    {
      id: 4,
      name: "test single",
      user_id: 2,
      first_range: 3600,
      second_range: 600,
      third_range: null,
      round_count: null,
      automatic_break: true,
      automatic_repeat: false,
    },
  ]);
};
