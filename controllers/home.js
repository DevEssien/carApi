exports.getHomePage = (req, res, next) => {
    return res.status(200).json({
        status: "Successful",
        statusCode: 200,
        message: "Getting home page",
    });
};
