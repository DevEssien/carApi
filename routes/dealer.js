const express = require("express");

const dealerController = require("../controllers/dealer");
const upload = require('../utils/multer')

const router = express.Router();

router.post("/add-car", dealerController.postAddCar);

router.post("/add-image", upload, dealerController.postCarImage);

router.post("/edit-car", dealerController.editCarDetails);

router.post("/delete-car", dealerController.postRemoveCar);

router.post('/delete-car-image', dealerController.deleteImage)

module.exports = router;
