const axios = require("axios");
const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.stock;

router.get("/:id", async (req, res) => {
  try {
    const show = await postData.getStockById(req.params.id);
    res.json(show);
  } catch (e) {
    res
      .status(404)
      .json({ error: `Stock with that ID cannot be found. ${e}.` });
  }
});

router.get("/", async (req, res) => {
  try {
    const showings = await postData.getPeople();
    res.json(showings);
  } catch (e) {
    // res.status(500).send();
    res.status(500).json({ error: e });
  }
});

module.exports = router;
