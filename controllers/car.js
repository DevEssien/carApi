require("dotenv").config();

const axios = require("axios");

exports.getCars = async (req, res, next) => {
    const url = "https://carapi.app/api/makes";
    try {
        const response = await axios.get(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                api_token: process.env.API_TOKEN,
                api_secret: process.env.API_SECRET,
            },
        });
        return res.status(response.status).json({
            status: "Successful",
            message: "Getting data",
            data: response.data,
        });
    } catch (error) {
        console.error(error);
    }
};
