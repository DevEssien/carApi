const express = require("express");

const dealerController = require("../controllers/dealer");

const router = express.Router();

router.get("/", dealerController.getHome);

router.get("/dealer", dealerController.getSignup);

module.exports = router;
