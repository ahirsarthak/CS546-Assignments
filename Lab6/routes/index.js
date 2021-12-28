const restROutes = require("./restaurants");
const reviewRoutes = require("./reviews");

const constructorMethod = (app) => {
  app.use("/restaurants", restROutes);
  app.use("/reviews", reviewRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

module.exports = constructorMethod;
