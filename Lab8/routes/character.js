const express = require("express");
const router = express.Router();
const data = require("../data");
const searchData = data.search;
const charData = data.character;

router.get("/:id", async (req, res) => {
  try {
    const charac = await charData.getCharacByID(req.params.id);

    res.render("posts/single", {
      charac: charac.data.results,
      name: charac.data.results.name,
    });
  } catch (e) {
    res.status(404).render("posts/error", {
      errorDescription: "No character found for  ID, please type existing ID.",
      name: "Cannot find character with provided ID",
    });
  }
});

module.exports = router;
