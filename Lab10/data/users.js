const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const utils = require("./utils");

const saltRounds = 16;

async function createUser(username, password) {
  for (let i of username) {
    if (i == " ") throw `username has empty spaces`;
  }
  for (let i of password) if (i == " ") throw `password has empty spaces`;

  for (let i of username) {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let chello = format.test(i);
    if (chello == true) throw `Username has wrong input characters`;
  }

  if (typeof username != "string" || username.trim() === "")
    throw `User Name ${userName} should be a string which is not empty.`;

  if (typeof password != "string" || password.trim() === "")
    throw `Password ${password} should be a string which is not empty.`;
  let username1 = username.trim();
  if (username1.length < 4) throw `Username is too long enter 4 or more`;

  let newPassword = password.trim();
  if (newPassword.length < 6) throw `Password is too short enter 6 or more`;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const usersCollection = await users();

  if (await utils.usernameExists(username)) {
    return "Username already taken";
  }

  const userCollection = await users();
  let newUser = {
    username: username.trim().toLowerCase(),

    hashedPassword: hashedPassword,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Failed to create a new user.";

  return { userInserted: true };
}
async function checkUser(username, password) {
  if (typeof username != "string" || username.trim() === "")
    throw `User Name ${username} should be a string which is not empty.`;

  if (typeof password != "string" || password.trim() === "")
    throw `Password ${password} should be a string which is not empty.`;
  let username1 = username.trim();
  if (username1.length < 4) throw `username is too short.`;

  let newPassword = password.trim();
  if (newPassword.length < 6) throw `Password is too short enter 6 or more.`;

  const userCollection = await users();

  const res = await userCollection.findOne({
    username: username,
  });
  if (res == null) {
    throw `error`;
  }
  if (await bcrypt.compare(password, res.hashedPassword)) {
    return { authenticated: true };
  } else {
    throw `Password not match`;
  }
}
module.exports = { createUser, checkUser };
