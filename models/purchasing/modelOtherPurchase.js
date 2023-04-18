const mongoose = require('mongoose')

const other_purchases_schema = new mongoose.Schema({

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
    purchasedDate: {
        type: String,
        required: true
    },
    purchasedSection: {
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
    shop: {
        type: String,
        required: false
    },
    purchasedItems: {
        type: [String],
        required: false
    },
    purchasedItemQuantities: {
        type: [Number],
        required: false
    },
    purchasedItemUnitPrices: {
        type: [Number],
        required: false
    },
    addedDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('other_purchases', other_purchases_schema)