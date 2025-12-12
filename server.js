const express = require("express");
const app = express();
const db = require("./db");

//body parser is middalware to convert the data in object for you automatically
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //its store in req.body

app.get("/", (req, res) => {
  res.send("Hello welcome to my hotel... ");
});



//Import the router files

const PersonRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes.js");

// use the routers
app.use("/person", PersonRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("server is listing on port 3000");
});
