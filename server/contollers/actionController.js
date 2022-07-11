const express = require("express");
const router = express.Router();
const Action = require("../models/action");

router.get("/", async (req, res) => {
  const { limit, category, latest } = req.query;
  let result;
  if (latest === undefined) result = await Action.getAll(limit, category, req);
  else result = await Action.getLatest(category);
  res.status(200).json({ sucess: true, data: result });
});

router.get("/weekly", async (req, res) => {
  const { category, page } = req.query;
  const result = await Action.getWeekData(category, page);
  res.status(200).json({ sucess: true, data: result });
});

router.get("/monthy", async (req, res) => {
  const { category, page } = req.query;
  const result = await Action.getMonthData(category, page);
  res.status(200).json({ sucess: true, data: result });
});

// router.get("/week-total", async (req, res) => {
//   const result = await Action.getAllSum();
//   res.status(200).json({ sucess: true, data: result });
// });
router.get("/week-total", async (req, res) => {
  const { length } = req.query;
  const result = await Action.getAllSum(length, req);
  res.status(200).json({ sucess: true, data: result });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Action.getById(id);
  res.status(200).json({ sucess: true, data: result });
});

router.post("/", async (req, res) => {
  const newAction = req.body;
  newAction.user_id = req.session.passport.user;
  const id = await Action.create(newAction);
  res.status(201).json({ sucess: true, data: { ...newAction, id } });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  await Action.update(update, id);
  res.status(200).json({ sucess: true, data: update });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Action.remove(id);
  res.status(200).json({ sucess: true });
});

module.exports = router;
