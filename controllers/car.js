const axios = require("axios");

exports.getCars = async (req, res, next) => {
    const url = "https://carapi.app/api/models";
    try {
        const response = await axios.get(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                api_token: "361986bc-3d0f-46f4-8136-b57ba85488ee",
                api_secret: "730ad4bc7e4e427b20baa438b5ec6d33",
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
