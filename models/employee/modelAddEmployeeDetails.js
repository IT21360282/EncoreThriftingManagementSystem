const mongoose = require('mongoose')

const add_employee_details_schema = new mongoose.Schema({

    empID: {
        type: String,
        required: false
    },
    empName: {
        type: String,
        required: false
    },
    empEmail: {
        type: String,
        required: false

    },
    empMobileNo: {
        type: String,
        required: false
    },
    empPost: {
        type: String,
        required: false
    },

    empNIC: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('add_employee_details', add_employee_details_schema)