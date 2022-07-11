/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("category").del();
  await knex.raw("ALTER SEQUENCE category_id_seq RESTART WITH 8");
  await knex("category").insert([
    {
      id: 1,
      title: "Math",
      description: "Keep track of hours spent studying Math",
      user_id: 1,
      public: false,
      timer_1: 1,
      timer_2: null,
    },
    {
      id: 2,
      title: "English",
      description: "Keep track of hours spent studying English",
      user_id: 2,
      public: false,
      timer_1: null,
      timer_2: null,
    },
    {
      id: 3,
      title: "Science",
      description: "Keep track of hours spent studying Science",
      user_id: 2,
      public: true,
      timer_1: 3,
      timer_2: 4,
    },
    {
      id: 4,
      title: "Netflix",
      description: "Keep track of hours spent watching netflix",
      user_id: 3,
      public: false,
      timer_1: null,
      timer_2: null,
    },
    {
      id: 5,
      title: "Work out",
      description: "Keep track of hours spent working out",
      user_id: 1,
      public: false,
      timer_1: 2,
      timer_2: null,
    },
    {
      id: 6,
      title: "Algorithm",
      description: "Keep track of hours spent studying algorithm",
      user_id: 1,
      public: false,
      timer_1: 2,
      timer_2: null,
    },
    {
      id: 7,
      title: "Reading",
      description: "Keep track of hours spent reading",
      user_id: 1,
      public: false,
      timer_1: 2,
      timer_2: null,
    },
  ]);
};
