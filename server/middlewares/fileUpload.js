const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const prefix = Date.now() + Math.random().toString();
        cb(null, prefix + file.originalname);
    },
});

function fileFilter(req, file, cb) {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
