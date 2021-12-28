const express = require("express");
const app = express();
const chalk = require("chalk");

const static = express.static(__dirname + "/public");
app.use("/public", static);

const configRoute = require("./routes");

const exphandlebars = require("express-handlebars");

app.use(
  require("express-session")({
    name: "AuthCookie",
    secret: "shhh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/private", (req, res, next) => {
  if (!req.session.username) {
    res.status(403).redirect("/");
  } else {
    next();
  }
});
app.use("/signup", (req, res, next) => {
  if (req.session.username) {
    res.status(401).render("others/error", {
      status: 401,
      error: "You have already logged in.",
      signed_in: req.body.signed_in,
      partial: "script",
    });
  } else {
    next();
  }
});
app.use("/login", (req, res, next) => {
  if (req.session.username) {
    res.status(401).render("others/error", {
      status: 401,
      error: "You have already logged in.",
    });
  } else {
    next();
  }
});
app.use("/logout", (req, res, next) => {
  if (!req.session.username) {
    res.status(403).redirect("/");
  } else {
    next();
  }
});
app.use((req, res, next) => {
  let time = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let auth;
  if (req.session.username) {
    auth = chalk.green("(Authenticated User)");
  } else {
    auth = chalk.red("(Non-Authenticated User)");
  }
  console.log(
    chalk.gray(`[${time}]: `) + `${method} ` + chalk.yellow(`${route} `) + auth
  );
  next();
});

configRoute(app);

// running server
app.listen(3000, () => {
  console.log("We've now got a server");
  console.log("Your routes will be running on http://localhost:3000");
});
