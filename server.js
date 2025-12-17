const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth.js");

require("dotenv").config();

//body parser is middalware to convert the data in object for you automatically
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //its store in req.body
const PORT = process.env.PORT || 3000;

//middleware

const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} request to ${req.baseUrl}`);
  // console.log(req);

  next();
};
app.use(loggerMiddleware);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Hello welcome to my hotel... ");
});

//Import the router files

const PersonRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes.js");

// use the routers
app.use("/person", localAuthMiddleware, PersonRoutes);
app.use("/menu", localAuthMiddleware, menuRoutes);

app.listen(PORT, () => {
  console.log("server is listing on port 3000");
});
