const mongoose = require('mongoose')

const supplier_schema = new mongoose.Schema({

    supID: {
        type: String,
        required: false
    },

    supName: {
        type: String,
        required: true
    },
   
    supMobileNo: {
        type: String,
        required: true
    },

    supEmail: {
        type: String,
        required: true
    },
   
    supType: {
        type: String,
        required: true
    },

    supTime: {
        type: String,
        required: false
    },

})

module.exports = mongoose.model('supplier', supplier_schema)