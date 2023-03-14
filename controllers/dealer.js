const Dealer = require("../models/dealer");
const Car = require("../models/car");

exports.postAddCar = async (req, res, next) => {
    const { name, brand, image_url, price } = req.body;
    try {
        const newCar = await Car.create({
            name: name,
            brand: brand,
            price: price,
            DealerId: req.dealer?.id,
        });
        return res.json({
            status: "Successful",
            message: "Created a new car",
            data: {
                car: newCar,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.editCarDetails = async (req, res, next) => {
    const { name, brand, image_url, price } = req.body;
    try {
        return res.json({
            status: "Successful",
            message: "Created a new car",
            data: {
                car: updatedCar,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
