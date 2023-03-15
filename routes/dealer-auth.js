const express = require("express");

const dealerAuthController = require("../controllers/dealer-auth");

const router = express.Router();

router.get("/", dealerAuthController.getDealerPage);

router.post("/signup", dealerAuthController.postSignup);

router.post("/login", dealerAuthController.postLogin);

router.post("/delete-account", dealerAuthController.postDeleteDealer);

// router.post('/logout')

module.exports = router;
