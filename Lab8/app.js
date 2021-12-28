const express = require("express");
const app = express();
const static = express.static(__dirname + "/public"); // serve static assets. All of our static assets, like css file, any client side javascript and any images website use will be stored in serve of public directory

const configRoutes = require("./routes"); // configure routes
const exphbs = require("express-handlebars"); //create instance of express-handlebars

app.use("/public", static); // tell app to use the /public directory as static. Without this, /public/css/main.css will not have effect
app.use(express.json()); //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined
app.use(express.urlencoded({ extended: true })); // get form data

app.engine("handlebars", exphbs({ defaultLayout: "main" })); // set up the engine by instance of handlebars. 'main' in { defaultLayout: 'main' } is main template, like a master page, which is rapper contain every page
app.set("view engine", "handlebars"); // set 'view engine' to be 'handlebars'

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
