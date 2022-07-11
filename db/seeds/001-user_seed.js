/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex.raw("ALTER SEQUENCE user_id_seq RESTART WITH 4");
  const userInfo = [
    {
      id: 1,
      user_name: "cake6",
      email: "cake@example.com",
      password: "123123123",
    },
    {
      id: 2,
      user_name: "Take1",
      email: "take@example.com",
      password: "123456789",
    },
    {
      id: 3,
      user_name: "Yokoooo!",
      email: "yoko@example.com",
      password: "321321321",
    },
  ];
  const users = [];

  const generateUsers = async () => {
    for (let i = 0; i < userInfo.length; i++) {
      const user = userInfo[i];
      const hashedPassword = await bcrypt.hash(user.password, 10);
      users.push({
        ...user,
        password: hashedPassword,
      });
    }
  };
  await generateUsers();
  await knex("user").insert(users);
};
