const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const utils = require("./utils");

router.get("/", utils.paginateCategory, async (req, res) => {
  const result = res.collection;
  res.status(200).json({ sucess: true, data: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Category.getById(id);
  res.status(200).json({ sucess: true, data: result });
});

router.post("/", async (req, res) => {
  const newCategory = req.body;
  newCategory.user_id = req.session.passport.user;
  await Category.create(newCategory);
  res.status(201).json({ sucess: true, data: newCategory });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  await Category.update(update, id);
  res.status(200).json({ sucess: true, data: update });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Category.remove(id);
  res.status(200).json({ sucess: true });
});

module.exports = router;
