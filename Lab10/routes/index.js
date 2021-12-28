const usersRoutes = require("./users");

//const path = require("path");

// Put all the routes together
const constructorMethod = (app) => {
  app.use("/", usersRoutes);

  // Catch all method
  app.use("*", (req, res) => {
    res.status(404).render("others/error", {
      status: 404,
      error: "Route not found.",
      partial: "script",
    });
  });
};

module.exports = constructorMethod;
