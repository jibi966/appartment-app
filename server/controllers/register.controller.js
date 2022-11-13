const express = require("express");
const router = express.Router();

const Admin = require("../models/admin.model");

router.post("", async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res
                .status(400)
                .send({error: true, message: "Please Provide a valid email or password"});
        }

        const isUser = await Admin.findOne({email: req.body.email}).lean().exec();
        if (isUser) {
            return res.status(400).send({error: true, message: "User already exists"});
        }

        const newUser = await Admin.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).send({newUser});
    } catch (err) {
        return res.status(500).send({error: true, message: err.message});
    }
});

module.exports = router;

