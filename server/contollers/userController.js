const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const initializePassport = require("../passport-config");

// initializePassport(passport, (email) => {
//   return users.find((user) => user.email === email);
// });

router.get("/", async (req, res) => {
  const { limit } = req;
  const result = await User.getAll(limit);
  res.status(200).json({ sucess: true, data: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await User.getById(id);
  res.status(200).json({ sucess: true, data: result });
});

router.post("/", async (req, res) => {
  try {
    const { password, email, username } = req.body;
    const newUser = { password, email, user_name: username };
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    await User.create(newUser);
    res.status(201).json({ sucess: true, data: newUser });
  } catch (e) {
    res.status(400).json({ sucess: false, data: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  await User.update(update, id);
  res.status(200).json({ sucess: true, data: update });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await User.remove(id);
  res.status(200).json({ sucess: true });
});

module.exports = router;
