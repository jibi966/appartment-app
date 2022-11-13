require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Admin = require("../models/admin.model");

const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
};

router.post("", async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res
                .status(400)
                .send({error: true, message: "Please Provide a valid email or password"});
        }

        let admin = await Admin.findOne({email: req.body.email});

        if (!admin) {
            return res.status(400).send({error: true, message: "User does not exist"});
        }

        const isValid = await admin.checkPassword(req.body.password);

        if (!isValid) {
            return res
                .status(400)
                .send({error: true, message: "e-Mail or password is incorrect"});
        }

        const token = newToken(admin);

        const user = await Admin.findOne({email: req.body.email}).lean().exec();

        return res.status(200).send({user, token});
    } catch (err) {
        return res.status(500).send({error: true, message: err.message});
    }
});

module.exports = router;
