const Dealer = require("../models/dealer");
const Car = require("../models/car");

const cloudinary = require("../utils/cloudinary");
const { request } = require("express");

exports.postAddCar = async (req, res, next) => {
    const { name, brand, image_url, price } = req.body;
    try {
        const newCar = await Car.create({
            name: name,
            brand: brand,
            price: price,
            DealerId: req.dealer?.id,
        });
        if (!newCar) {
            const error = new Error("Could not create a new Car");
            error.statusCode = 500;
            throw error;
        }
        return res.status(201).json({
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

exports.postCarImage = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("No file uploaded");
            error.statusCode = 422;
            throw error;
        }
        console.log("req.file exist");
        const result = await cloudinary.uploader.upload(req.file.path);
        const image_url = result.secure_url;
        
        if (!result.public_id) {
            const error = new Error("Poor network or Server side error");
            error.statusCode = 500;
            throw error;
        }
        return res.status(201).json({
            status: "Successful",
            message: "Uploaded image file to cloudinary",
            data: {
                result: result,
                imageurl: imageurl,
                imagesrc: imagesrc
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
        if (!updatedCar) {
            const error = new Error("Updating failed");
            error.statusCode = 500;
            throw error;
        }

        return res.status(200).json({
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

exports.postRemoveCar = async (req, res, next) => {
    try {
        const id = req.body?.id;
        const car = await Car.findOne({ where: { id: id } });
        if (!car) {
            const error = new Error("Car not found");
            error.statusCode = 404;
            throw error;
        }
        const carRemoved = await Car.destroy({ where: { id: id } });
        if (!carRemoved) {
            const error = new Error("Deletion failed");
            error.statusCode = 500;
            throw error;
        }
        return res.status(200).json({
            status: "Successful",
            message: `Removed an existing car with id ${id}`,
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

