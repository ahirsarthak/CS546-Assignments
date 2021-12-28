const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");
const bcrypt = require("bcrypt");

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const usersData = data.users;

router.get("/", async (req, res) => {
  try {
    if (req.session.username) {
      res.redirect("/private");
      return;
    } else {
      res.render("others/login");
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.username) {
      res.redirect("/private");
      return;
    } else {
      res.redirect("/");
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/signup", async (req, res) => {
  try {
    if (req.session.username) {
      res.status(200).redirect("/private");
    }
    res.status(200).render("others/signup", {
      title: "Sign up",
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/signup", async (req, res) => {
  for (let i of req.body.username) {
    if (i == " ") {
      res
        .status(400)
        .render("others/signup", { error: "username has empty spaces" });
      return;
    }
  }
  for (let i of req.body.password) {
    if (i == " ") {
      res
        .status(400)
        .render("others/signup", { error: "password has empty spaces" });
      return;
    }
  }

  for (let i of req.body.username) {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let chello = format.test(i);
    if (chello == true) {
      res.status(400).render("others/signup", {
        error: "Username has wrong input characters ",
      });
      return;
    }
  }

  const username = req.body.username.toString().toLowerCase().trim();

  const password = req.body.password.toString().trim().replace(/\s/g, "");

  if (!username || !password) {
    res.status(400).render("others/signup", {
      error: " HTTP 400 Error: Invalid input. All fields must be supplied.",
      partial: "signup",
    });
    return;
  }
  if (username.length < 4) {
    res.status(400).render("others/signup", {
      error: "Error: Username is too  short.",
      partial: "signup",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).render("others/signup", {
      error: "Error: Password is  too short.",
      partial: "signup",
    });
    return;
  }

  try {
    let newUser = await usersData.createUser(username, password);

    if (newUser.userInserted == true) {
      res.redirect("/");
    } else {
      res.render("others/signup", { error: "username already exists" });
    }
    return;
  } catch (e) {
    // res.json(error);
    res.status(500).status(400).render("others/signup", {
      title: "Error",
      status: "404",
    });
  }
});

router.get("/private", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
    return;
  }
  res.render("others/private", { name: req.session.username });
});

router.post("/login", async (req, res) => {
  const username = req.body.username.toString().toLowerCase().trim();
  const password = req.body.password.toString().trim();

  if (!username || !password) {
    res.status(401).render("others/login", {
      error: "Missing username or password.",
      username: username,
      partial: "signup",
    });
    return;
  }
  if (username.length < 4) {
    res.status(400).render("others/signup", {
      error: "Error: Username is too  short.",
      partial: "signup",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).render("others/signup", {
      error: "Error: Password is  too short.",
      partial: "signup",
    });
    return;
  }

  // Retrieve user from file
  try {
    let newUser1 = await usersData.checkUser(username, password);
    if (newUser1.authenticated == true) {
      req.session.username = username;
      res.status(200).redirect("/private");
      return;
    } else {
      res.status(401).render("others/login", {
        error: "Wrong username or password.",
        username: username,
      });
      return;
    }
    // return to main page?
  } catch (e) {
    res.status(401).render("others/login", {
      hasErrors: true,
      error: "You did not provide a valid username and/or password.",
      title: "Login",
      username: username,

      partial: "signup",
    });
    return;
  }
});
router.get("/logout", async (req, res) => {
  res.clearCookie("AuthCookie");
  res.clearCookie("Build Session");
  req.session.destroy();
  res.render("others/logout");
});

module.exports = router;
