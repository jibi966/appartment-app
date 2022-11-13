const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        first_name: {type: String},
        last_name: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ["admin", "staff", "security"], default: "admin"},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

/**
 * ( || this.isNew ) check this if needed with the isModified method
 */

adminSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        var hash = bcrypt.hashSync(this.password, 8);
        this.password = hash;
        return next();
    } else {
        return next();
    }
});

adminSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("admin", adminSchema);
