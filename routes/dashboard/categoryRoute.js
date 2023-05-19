const router = require("express").Router();
const { request } = require("express");
let categoryModel = require("../../models/dashboard/categoryModel.js");

//add data to Employee table
//./Employee/add
//Post request
//http://localhost:8050/Employee/add
router.post("/categories", async (req, res) => {
  try {
    const { Category_Name, Category_ID, Price, Category_Type, Description } =
      req.body;
    const newCategory = new categoryModel({
      Category_Name,
      Category_ID,
      Price,
      Category_Type,
      Description,
    });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//search Employee
//http://localhost:8050/Employee/
//Get Request
router.route("/categories").get(async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//update
//http://localhost:8090/Employee/update/:id
//Put Request
router.route("/updateCategories/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { Category_Name, Category_ID, Price, Category_Type, Description } =
    req.body;
  const updateCategory = {
    Category_Name,
    Category_ID,
    Price,
    Category_Type,
    Description,
  };
  console.log(updateCategory);

  const update = await categoryModel
    .findByIdAndUpdate(userId, updateCategory)
    .then(() => {
      res.status(200).send({ status: "Category Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data" + err.message });
    });
});

//delete category
//http://localhost:8000/category/deleteCategories/:id
//Delete Request
//working
router.route("/deleteCategories/:id").delete(async (req, res) => {
  let id = req.params.id;

  await categoryModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Category deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ status: "Error deleting category" });
    });
});

//find one of the category
router.route("/getCategories/:id").get((req, res) => {
  let id = req.params.id;
  categoryModel
    .find({ Category_Name: id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
