const path = require("path");

const constructorMethod = (app) => {
  app.get("/", async (req, res) => {
    res.sendFile(path.resolve("static/index.html"));
  });
  app.use("*", (req, res) => {
    // res.sendStatus(404);
    res.redirect("/");
  });
};

module.exports = constructorMethod;
