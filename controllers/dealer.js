const path = require('path')
const fs = require('fs')
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
        const car = await Car.findOne({ where: { id: 1 } });
        if (!car) {
            const error = new Error("Car not found");
            error.statusCode = 404;
            throw error;
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        if (!result.public_id) {
            const error = new Error("Poor network or Server side error");
            error.statusCode = 500;
            throw error;
        }
        car.image_url = result.secure_url;
        car.image_public_id = result.public_id
        car.local_image_path = req.file.path
        const updatedCar = await car.save();

        return res.status(201).json({
            status: "Successful",
            message: "Uploaded image file to cloudinary",
            data: {
                car: updatedCar,
                cloudinaryResult: {
                    result
                },
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
    const id = req.params.id;
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

exports.deleteImage = async (req, res, next) => {
    const id = req.body.id;
    try{
        const car = await Car.findOne({ where: { id: id }})
        if (!car) {
            const error = new Error("Car not found");
            error.statusCode = 404;
            throw error;
        }
        await cloudinary.uploader.destroy(car.image_public_id, async (error, result) => {
            if (error) {
                const error = new Error("Poor network or Server side error");
                error.statusCode = 500;
                throw error;
            }
            return res.status(200).json({
                status: "Successful",
                message: "deleted image file to cloudinary",
                data: {
                    cloudinaryResult: {
                        result: await result
                    },
                },
            });
        });
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.postRemoveCar = async (req, res, next) => {
    try {
        const id = req.params?.id;
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
    fs.unlink(filePath, (err) => {
        if (!err) {
            console.log('deleted the file')
        }
        console.log("error ", err)
    });
};

