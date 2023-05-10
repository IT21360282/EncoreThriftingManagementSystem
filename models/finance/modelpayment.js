const mongoose = require('mongoose')

const finance_schema = new mongoose.Schema({

    paymentID: {
        type: String,
        required: true
    },

    FullName: {
        type: String,
        required: true
    },
   
    Pay_Type: {
        type: String,
        required: true
    },

    Amount: {
        type: Number,
        required: true
    },
   
    Pay_Date: {
        type: String,
        required: true
    },

    Card_Number: {
        type: String,
        required: true
    },

    Expired_Year: {
        type: String,
        required: true
    },

    CVC: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('finance', finance_schema)