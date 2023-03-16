const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const dealerAuthRoute = require("./routes/dealer-auth");
const dealerRoute = require("./routes/dealer");
const homeRoute = require("./routes/home");

const Car = require("./models/car");
const Dealer = require("./models/dealer");

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("image"));

app.use((error, req, res, next) => {
    const status = error?.statusCode || 500;
    const message = error?.message || "Server Side Error!";
    const data = error?.data || null;
    return res.status(status).json({
        status: status,
        message: message,
        data: data,
    });
});

app.use(homeRoute);
app.use("/auth/dealer", dealerAuthRoute);
app.use("/dealer", dealerRoute);

app.use(async (req, res, next) => {
    try {
        const dealer = await Dealer.findOne({ where: { email: req.body?.email } });
        if (!dealer) {
            console.log("No dealer found!");
            return;
        }
        req.dealer = dealer;
        next();
    } catch (error) {
        console.log(error);
    }
});
Dealer.hasMany(Car);

Car.belongsTo(Dealer, {
    constraints: true,
    onDelete: "CASCADE",
});

const create_table = async () => {
    // await Car.sync({ force: true });
    // await Dealer.sync({ force: true });
    await Car.sync();
    await Dealer.sync();
    // await Dealer.destroy({ where: { email: "essienemma300@gmail.com" } });
};
create_table();

app.listen(3000, () => {
    console.log("server spinning at port 3000");
});
