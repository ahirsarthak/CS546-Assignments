const axios = require("axios");
const express = require("express");
const data = require("../data");
const postData = data.people;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const showings = await postData.getPeople();
    res.json(showings);
  } catch (e) {
    // res.status(500).send();
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await postData.getPersonById(req.params.id);
    res.json(show);
  } catch (e) {
    res
      .status(404)
      .json({ error: `Person with that ID cannot be found. ${e}.` });
  }
});

module.exports = router;
