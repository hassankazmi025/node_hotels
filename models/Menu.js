const mongooose = require("mongoose");

const menuItemSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  taste: {
    type: String,
    enum: ["sweet", "spice", "sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingrediants: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

//Create Menu model

const MenuItems = mongooose.model("MenuItems", menuItemSchema);

module.exports = MenuItems;
