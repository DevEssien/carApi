const express = require("express");
const bodyParser = require("body-parser");

const carRoute = require("./routes/car");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(carRoute);

app.listen(3000, () => {
    console.log("server spinning at port 3000");
});
