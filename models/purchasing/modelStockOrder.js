const mongoose = require('mongoose')

const stock_order_schema = new mongoose.Schema({

    purID: {
        type: String,
        required: true
    },
    purDigitID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    placedDate: {
        type: String,
        required: true
    },
    confirmedDate: {
        type: String,
        required: false
    },
    orderStatus: {
        type: String,
        required: false
    },
    expectedDate: {
        type: String,
        required: false
    },
    receivedDate: {
        type: String,
        required: false
    },
    totalCost: {
        type: String,
        required: false
    },
    totalQty: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: false
    },
    supplier: {
        type: String,
        required: true
    },
    shippingFee: {
        type: String,
        required: false
    },
    stockItems: {
        type: [String],
        required: true
    },
    stockItemsQty: {
        type: [Number],
        required: true
    },
    stockItemsUnitPrice: {
        type: [String],
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('stock_orders', stock_order_schema)