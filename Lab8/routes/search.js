const express = require("express");
const router = express.Router();
const data = require("../data");
const searchData = data.search;
const characData = data.character;

router.get("/", async (req, res) => {
  // GET http://localhost:3000/
  let input = req.body;
  res.render("posts/form", { post: input, title: "Show Finder" }); // pass inputted searchTerm into form
});

router.post("/search", async (req, res) => {
  let input = req.body;

  if (!input.searchTerm || input.searchTerm == " ") {
    res.status(400).render("posts/error", {
      errorDescription:
        "You should input text into form for searching and the text cannot just be spaces.",
      title: "Error",
    });
    return;
  }

  let characList;
  try {
    characList = await searchData.getCharacbySearchTerm(input.searchTerm);
  } catch (e) {
    res.render("posts/search", {
      searchTerm: input.searchTerm,
      characters: characList,
      hasErrors: true,
      error: e,
      title: "Error",
    });
  }

  res.render("posts/search", {
    searchTerm: input.searchTerm,
    characters: characList,
    // title: "characters Found",
  });
});

module.exports = router;
