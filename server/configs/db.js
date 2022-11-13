const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect(process.env.MONGO);
};

module.exports = connect;
