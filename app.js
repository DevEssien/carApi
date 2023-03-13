const express = require("express");
const bodyParser = require("body-parser");

const carRoute = require("./routes/car");
const Car = require("./models/car");
const Engine = require("./models/engine");
const Mileage = require("./models/mileage");
const Body = require("./models/body");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(carRoute);

const create_table = async () => {
    await Car.sync();
    await Engine.sync();
    await Mileage.sync();
    await Body.sync();
};
create_table();

app.listen(3000, () => {
    console.log("server spinning at port 3000");
});
