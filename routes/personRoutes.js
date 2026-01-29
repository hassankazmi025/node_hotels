const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

//Post route to add a Person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data
    // Create a new Person document using yhe mongooose model
    const newPerson = new Person(data);

    //save the new Person
    const response = await newPerson.save();
    console.log("data save");

    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);
    console.log("Token is :", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  try {
    // Extract the username and password from request
    const { username, password } = req.body;

    // Find the User by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match , return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    //generate Token

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    //return token as response
    res.json({ token });
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//Profile Route

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data is fetching...");
    res.status(200).json(data);
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type the URL parameter
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract id form the Url parameter
    const updatedPersonData = req.body; // Update data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the Update document
        runValidators: true, // Run Mongooes Validation
      }
    );
    if (!response) {
      res.status(404).json({ error: "Person not Found" });
    }
    res.status(200).json(response);
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//Delete the record

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract id form the Url parameter

    //Assuming you have peron model

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person not Found" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

module.exports = router;

// app.patch("/person/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updateRecord = { $set: req.body };

//     const data = await Person.updateOne({ _id: id }, updateRecord);
//     console.log("data is updated");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("error occur:", err);
//     res.status(500).json({ error: "Internal server Error" });
//   }
// });
