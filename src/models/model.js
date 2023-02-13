const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        lastname: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        phone : {
            type: String,
            required: true,
            min: 8,
            max: 15,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);




const User = mongoose.model('User', userSchema)

module.exports = User;