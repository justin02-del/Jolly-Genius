//this is the routes. takes info processed by contoller

const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController"); // importing the user controller 

router.post("/sign-up", userController.registerUser);
router.post("/Login", userController.loginUser);


module.exports = router;