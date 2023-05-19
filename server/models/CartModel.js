const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item_details',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },

    }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);