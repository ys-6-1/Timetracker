const knex = require("../knex");
const express = require("express");
const router = express.Router();
const Temp = require("../models/temp_action");

router.get("/", async (req, res) => {
  const { limit, category } = req.query;
  // const result = await Temp.getAll(limit, category, req);
  const result = await Temp.getAll(limit, req);
  res.status(200).json({ sucess: true, data: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Temp.getById(id);
  res.status(200).json({ sucess: true, data: result });
});

router.post("/", async (req, res) => {
  const { category } = req.query;
  const newAction = req.body;
  await knex.raw(
    "SELECT setval('temp_action_id_seq', (SELECT MAX(id) from \"temp_action\"));"
  );
  const result = await Temp.create(newAction, category);
  res.status(200).json({ success: true, data: result });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  await Temp.update(update, id);
  res.status(200).json({ sucess: true, data: update });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Temp.remove(id);
  res.status(200).json({ sucess: true });
});

module.exports = router;
