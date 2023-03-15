const express = require("express");

const dealerController = require("../controllers/dealer");

const router = express.Router();

router.post("/add-car", dealerController.postAddCar);

router.post("/edit-car", dealerController.editCarDetails);

module.exports = router;
