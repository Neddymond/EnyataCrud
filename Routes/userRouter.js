require('dotenv').config();
const express = require("express");
const router = new express.Router();
const {validateUser} = require('../middleware/validateUser');
const controller = require('../controllers/user.controller');

router.post("/create", validateUser, controller.CreateUser);
router.post("/get", validateUser, controller.GetUser);
router.put("/update", controller.UpdateUser);
router.delete("/delete", controller.DeleteUser);

module.exports = router;