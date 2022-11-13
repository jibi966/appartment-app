const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
    {
        user_type: {type: String, enum: ["owner", "tenant"], default: "tenant"},
        block: {type: String, required: true},
        flat_no: {type: String, required: true},
        flat_image: {type: String, required: false},
        admin_id: {type: mongoose.Schema.Types.ObjectId, ref: 'admin', required: true},
        users_count: {type: String, default: 0},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("flat", flatSchema);
