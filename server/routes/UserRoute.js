// const { Router } = require("express");
// const { getUser, saveUser, updateUser, deleteUser } = require("../controllers/UserControllers");

// const router = Router();

// router.get("/get", getUser);
// router.post("/save", saveUser);
// router.put("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

// module.exports = router;


const { Router } = require('express');
const router = Router();

const { userSignup, userSignin, userData } = require('../controllers/UserControllers');

router.post('/Signup', userSignup);
router.post('/Signin', userSignin);

// router.post('/getUserByID', getUserByID);
router.post('/MyProfile', userData);

module.exports = router;