const express = require("express");

const dealerController = require("../controllers/dealer");

const router = express.Router();

router.post("/add-car", dealerController.postAddCar);

router.post("/add-image", dealerController.postCarImage);

router.post("/edit-car", dealerController.editCarDetails);

router.post("/delete-car", dealerController.postRemoveCar);

module.exports = router;
