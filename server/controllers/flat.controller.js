const express = require("express");
const router = express.Router();

const Flat = require("../models/flat.model");
const User = require("../models/user.model");
const Upload = require("../middlewares/fileUpload");

router.post("/add-flat", Upload.single("flat_image"), async (req, res) => {
    try {
        const createdFlat = await Flat.create({
            flat_no: req.body.flat_no,
            block: req.body.block,
            flat_image: req.file.path,
            admin_id: req.user._id,
            user_type: req.body.user_type,
        });
        return res.status(200).send({createdFlat});
    } catch (error) {
        return res.status(500).send({error: true, message: error.message});
    }
});


router.get('/all-flats', async (req, res) => {
    try {
        const page = +req.query.page + 1;
        const size = +req.query.limit;
        const offset = (page - 1) * size;

        const allFlats = await Flat.find({admin_id: req.user._id}).skip(offset).limit(size).lean().exec();
        const countFlats = await Flat.find({admin_id: req.user._id}).countDocuments();
        return res.status(200).send({flats: allFlats, countFlats});
    } catch (error) {
        return res.status(500).send({error: true, message: error.message});
    }
});


router.get('/get-one-flat/:id', async (req, res) => {
    try {
        const flatId = req.params.id;
        const oneFlatDetails = await Flat.findById(flatId).populate("admin_id", "first_name last_name").lean().exec();
        const userDetails = await User.find({flat_id: flatId}).lean().exec();
        return res.status(200).send({oneFlatDetails, userDetails});
    } catch (error) {
        return res.status(500).send({error: true, message: error.message})
    }
});

router.get('/filter', async (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    const adminId = req.user._id;
    try {
        const flats = await Flat.find({admin_id: adminId}).lean().exec();
        const filteredFlats = flats.filter((data) => data[key] === value);
        const countFlats = filteredFlats.length;
        return res.status(200).send({flats: filteredFlats, countFlats});
    } catch (error) {
        return res.status(500).send({error: true, message: error.message})
    }
});

router.get('/sort', async (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    const adminId = req.user._id;

    const page = +req.query.page + 1;
    const size = +req.query.limit;
    const offset = (page - 1) * size;

    let sortObj = {};
    if (value === 'asc') {
        sortObj[key] = 1;
    } else if (value === 'desc') {
        sortObj[key] = -1;
    }
    try {
        const flats = await Flat.find({admin_id: adminId}).skip(offset).limit(size).sort(sortObj).lean().exec();
        const countFlats = await Flat.find({admin_id: req.user._id}).sort(sortObj).countDocuments();
        return res.status(200).send({flats, countFlats});
    } catch (error) {
        return res.status(500).send({error: true, message: error.message});
    }
});


module.exports = router;
