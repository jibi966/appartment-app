const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }
            return resolve(user);
        })
    })
}

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send({message: 'Invalid authorization Token 1'});
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
        return res.status(400).send({message: 'Invalid authorization Token 2'});
    }
    const token = req.headers.authorization.split(' ')[1];

    let user;

    try {
        user = await verifyToken(token);
    } catch (err) {
        return res.status(400).send({message: 'Invalid authorization Token 3'});
    }
    req.user = user.user;
    return next();
}