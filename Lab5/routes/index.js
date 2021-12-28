const showsRoutes = require("./people");
const hello = require("./stocks");

const constructorMethod = (app) => {
  app.use("/people", showsRoutes);
  app.use("/stocks", hello);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found | Wrong URL link" });
  });
};

module.exports = constructorMethod;
