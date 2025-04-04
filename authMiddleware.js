const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied.');

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = await User.findById(verified.id);
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authenticate;
