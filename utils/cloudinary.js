const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
    cloud_name: "dpvjakqrc",
    api_key: "383566724383971",
    api_secret: "nKPo_SdLvLH21TpcLsmYj18fGsw",
});

module.exports = cloudinary;

// const result = await cloudinary.uploader.upload(req.file.path);
