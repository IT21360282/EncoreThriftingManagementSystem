const mongoose = require('mongoose')

const bank_schema = new mongoose.Schema({

    B_No: {
        type: String,
        required: true
    },

    B_Name: {
        type: String,
        required: true
    },
   
    Br_Name: {
        type: String,
        required: true
    },

    Acc_No: {
        type: Number,
        required: true
    },
   
    SWIFT: {
        type: String,
        required: true
    },

    Acc_Cur: {
        type: String,
        required: true
    },

    Acc_Type: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('bank', bank_schema)