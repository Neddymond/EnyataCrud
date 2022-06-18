require('dotenv').config();
const express = require("express");
const router = new express.Router();
const {validateCreateUser, validateGetUser} = require('../middleware/validateUser');
const controller = require('../controllers/user.controller');

router.post("/create", validateCreateUser, controller.CreateUser);
router.post("/get", validateGetUser, controller.GetUser);
router.put("/update/:id", controller.UpdateUser);
router.delete("/delete/:id", controller.DeleteUser);

module.exports = router;