const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  Category_Name: {
    type: String,
    required: true,
  },

  Category_ID: {
    type: String,
    required: true,
  },

  Price: {
    type: String,
    required: true,
  },

  Category_Type: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },
});

//customer table and path
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
