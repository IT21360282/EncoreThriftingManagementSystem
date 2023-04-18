const mongoose = require('mongoose')

const stock_order_items_schema = new mongoose.Schema({
    purFullID: {
        type: String,
        required: true
    },
    stockItems: {
        type: [String],
        required: true
    },
    stockItemsQty: {
        type: [String],
        required: true
    },
})

module.exports = mongoose.model('stock_order_items', stock_order_items_schema)