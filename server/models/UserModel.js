const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        default: '01123456789'
    },
    dob: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: String,
        default: "Your Address Here"
    },
    delAddress: {
        type: String,
        default: "Delivery Address Here"
    },
});

module.exports = mongoose.model("User", UserSchema);
