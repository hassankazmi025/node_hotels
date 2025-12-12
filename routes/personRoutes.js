const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

//Post route to add a Person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data
    // Create a new Person document using yhe mongooose model
    const newPerson = new Person(data);

    //save the new Person
    const response = await newPerson.save();
    console.log("data save");
    res.status(200).json(response);
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// //GET method to get the person
// router.get("/", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("data is fetching...");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("error occur:", err);
//     res.status(500).json({ error: "Internal server Error" });
//   }
// });

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
