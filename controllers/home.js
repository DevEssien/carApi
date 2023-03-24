const Car = require('../models/car')

exports.getHomePage = async (req, res, next) => {
    const cars = await Car.findAll()
    return res.render('home', {
        cars: cars
    })
    // return res.status(200).json({
    //     status: "Successful",
    //     statusCode: 200,
    //     message: "Getting home page",
    // });
};
