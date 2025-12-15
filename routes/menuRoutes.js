const express = require("express");
const router = express.Router();

const MenuItems = require("./../models/Menu");

//Post MenuItems

router.post("/", async (req, res) => {
  try {
    const menuData = req.body;
    const newMenudata = new MenuItems(menuData);

    //save manuItems as new menuItem
    const response = await newMenudata.save();
    console.log("data is saved in menu");
    res.status(200).json(response);
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//get Menu

router.get("/", async (req, res) => {
  try {
    const data = await MenuItems.find();

    res.status(200).json(data);
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spice" || tasteType == "sour") {
      const response = await MenuItems.find({ taste: tasteType });

      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log("error occur:", err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

module.exports = router;
