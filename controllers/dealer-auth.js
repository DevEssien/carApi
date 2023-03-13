const bcrpyt = require("bcryptjs");
const Dealer = require("../models/dealer");

exports.getDealerPage = (req, res, next) => {
    return res.status(200).json({
        status: "Successful",
        message: "Getting dealer page",
    });
};

exports.postSignup = async (req, res, next) => {
    const { email, password, name, phoneno } = req.body;
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

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
