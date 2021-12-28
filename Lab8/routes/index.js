const characRoutes = require("./character");
const searchRoutes = require("./search");

const constructorMethod = (app) => {
  app.use("/characters", characRoutes);
  app.use("/search", searchRoutes);
  app.use("/", searchRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

module.exports = constructorMethod;
