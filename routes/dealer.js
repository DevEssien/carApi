const express = require("express");

const dealerController = require("../controllers/dealer");

const router = express.Router();

router.post("/add-car", dealerController.postAddCar);

module.exports = router;
