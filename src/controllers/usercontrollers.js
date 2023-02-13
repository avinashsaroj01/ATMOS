const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/model');


const register = asyncHandler(async (req, res) => {
    const { firstname,lastname,phone,email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        firstname, lastname, phone, email, password
    });

    if (user) {
        res.status(201).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            firstname: user.firstname,
            lastname: user.lastname,
        })
    } else {
        res.status(400);
        throw new Error('Error Occured');
    }

})

module.exports = { register };
