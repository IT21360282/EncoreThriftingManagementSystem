const mongoose = require('mongoose')

const stock_order_schema = new mongoose.Schema({

    purID: {
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
        required: true
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
        required: false
    },
    paymentStatus: {
        type: String,
        required: false
    },
    supplier: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('stock_orders', stock_order_schema)