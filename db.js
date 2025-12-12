const mongoose = require("mongoose");

//Define the MongoDB connection URL

const mongoURL = "mongodb://localhost:27017/hotels"; //replace 'mydatabase' with your database name

//Set up MongoDb Connection
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(mongoURL);

//Get the default connection
//Monggoose maintains a default connection object representing the mongoDB connection

const db = mongoose.connection;

//define event listeners for database connections

db.on("connected", () => {
  console.log("MongoDB sever is connected");
});

db.on("error", (err) => {
  console.log("MongoBD connection error", err);
});

db.on("disconnected", () => {
  console.log("MongoBD connection disconnected");
});

//Export the database connection
module.exports = db;
