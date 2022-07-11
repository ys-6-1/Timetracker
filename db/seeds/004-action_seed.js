/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const today = new Date();
const yesterday = new Date(today);
const twoDaysBefore = new Date(today);
const threeDaysBefore = new Date(today);
const fourDaysBefore = new Date(today);
const fiveDaysBefore = new Date(today);
const sixDaysBefore = new Date(today);

yesterday.setDate(yesterday.getDate() - 1);
twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
fourDaysBefore.setDate(fourDaysBefore.getDate() - 4);
fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);
sixDaysBefore.setDate(sixDaysBefore.getDate() - 6);

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("action").del();
  await knex.raw("ALTER SEQUENCE action_id_seq RESTART WITH 304");
  const today = new Date();
  const entries = [];
  const createMockData = () => {
    let id = 0;
    for (let i = 100; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      let category_id = Math.floor(Math.random() * 7) + 1;
      for (let j = 0; j < 3; j++) {
        id += 1;
        category_id += j;
        if (category_id > 7) category_id -= 7;

        let user_id;
        if (category_id === 4) user_id = 3;
        else if (category_id === 2 || category_id === 3) user_id = 2;
        else user_id = 1;

        const duration = Math.floor(Math.random() * 3000) + 3000;
        const entry = { id, category_id, user_id, duration, date };
        entries.push(entry);
      }
    }
  };
  createMockData();
  await knex("action").insert(entries);
};
