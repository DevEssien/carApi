const express = require("express");
const bodyParser = require("body-parser");

const dealerRoute = require("./routes/dealer");
const Car = require("./models/car");
const Dealer = require("./models/dealer");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(dealerRoute);

const create_table = async () => {
    // await Car.sync({ force: true });
    // await Dealer.sync({ force: true });

    await Car.sync();
    await Dealer.sync();
};
create_table();

app.listen(3000, () => {
    console.log("server spinning at port 3000");
});
