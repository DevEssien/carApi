const bcrpyt = require("bcryptjs");
const Dealer = require("../models/dealer");
const Car = require("../models/car");

exports.getDealerPage = (req, res, next) => {
    return res.status(200).json({
        status: "Successful",
        message: "Getting dealer page",
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, password, name, phoneno } = req.body;
    console.log("email", email);
    try {
        const dealer = await Dealer.findOne({ where: { email: email } });
        if (dealer) {
            const error = new Error("Email already exist");
            error.statusCode = 422;
            throw error;
        }
        const hashedPassword = await bcrpyt.hash(password, 12);
        const newDealer = await Dealer.create({
            name: name,
            email: email,
            password: hashedPassword,
            phoneno: phoneno,
        });
        await newDealer.save();
        return res.status(201).json({
            status: "Successful",
            message: "New Dealer created",
            data: {
                dealer: newDealer,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postLogin = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    console.log("email, ", email);
    try {
        const dealer = await Dealer.findOne({ where: { email: email } });
        if (!dealer) {
            const error = new Error("Email Not Found!");
            error.statusCode = 404;
            throw error;
        }
        try {
            const matchedPassword = await bcrpyt.compare(password, dealer?.password);
            if (!matchedPassword) {
                const error = new Error("Incorrect password!");
                error.statusCode = 422;
                throw error;
            }
            return res.status(200).json({
                status: "Successful",
                message: "Dealer found",
                data: {
                    dealer: dealer,
                },
            });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postDeleteDealer = async (req, res, next) => {
    const id = req.body?.id;
    try {
        const dealer = await Dealer.findOne({ where: { id: id } });
        const cars = await Car.findAll({ where: { DealerId: id } });
        if (!dealer) {
            const error = new Error("Dealer not found");
            error.statusCode = 404;
            throw error;
        }
        const DealerRemoved = await Dealer.destroy({ where: { id: id } });
        if (!DealerRemoved) {
            const error = new Error("Dealer Deletion failed");
            error.statusCode = 500;
            throw error;
        }
        if (!cars) {
            const error = new Error("Cars not found");
            error.statusCode = 404;
            throw error;
        }
        const carsRemoved = await Car.destroy({ where: { DealerId: null } });
        if (!carsRemoved) {
            const error = new Error("Car Deletion failed");
            error.statusCode = 500;
            throw error;
        }
        return res.status(200).json({
            status: "Successful",
            message: 'Removed an existing Dealer and cars',
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.postLogout = async (req, res, next) => {
    //code
};
