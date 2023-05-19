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
        required: true
    },
    totalQty: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: false
    },
    shop: {
        type: String,
        required: true
    },
    purchasedItems: {
        type: [String],
        required: true
    },
    purchasedItemQuantities: {
        type: [Number],
        required: true
    },
    purchasedItemUnitPrices: {
        type: [Number],
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('other_purchases', other_purchases_schema)