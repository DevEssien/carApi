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
    const { id, name, brand, image_url, price } = req.body;
    try {
        const car = await Car.findOne({ where: { id: id } });
        if (!car) {
            const error = new Error("Car not found");
            error.statusCode = 404;
            throw error;
        }
        car.name = name;
        car.brand = brand;
        car.price = price;
        const updatedCar = await car.save();

        return res.json({
            status: "Successful",
            message: "Updated an existing car",
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
