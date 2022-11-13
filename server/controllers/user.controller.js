const express = require("express");
const router = express.Router();

const Flat = require("../models/flat.model");
const User = require("../models/user.model");

router.post('/add-new-user', async (req, res) => {
    try {
        const flatId = req.query.flat;
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            flat_id: flatId
        });
        const totalUserCount = await User.find({flat_id: flatId}).countDocuments();
        const updateFlatCount = await Flat.findByIdAndUpdate(flatId, {users_count: totalUserCount});
        return res.status(200).send(user);
    } catch (err) {
        res.status(500).send({error: true, message: err.message});
    }
})


module.exports = router;
