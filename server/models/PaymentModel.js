const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    delAddress: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    ItemName: {
        type: String,
    },
    unitPrice: {
        type: Number,
    },
    units: {
        type: Number,
    },
    delFee: {
        type: Number,
    },
    total: {
        type: Number,
    },
    cartTotal: {
        type: Number,
    }
}, { timestamps: true});

module.exports = mongoose.model('Payment', PaymentSchema);