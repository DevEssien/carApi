const express = require("express");

const dealerController = require("../controllers/dealer-auth");

const router = express.Router();

router.get("/", dealerController.getDealerPage);

router.post("/signup", dealerController.postSignup);

router.post("/login", dealerController.postLogin);

module.exports = router;
