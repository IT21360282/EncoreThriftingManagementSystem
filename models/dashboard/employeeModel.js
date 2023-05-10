const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    First_name : {
        type : String,
        required: true
    },
    Last_name: {
        type: String,
        required: true
    },
    NIC : {
        type : String,
        required: true
    },
    Address : {
        type : String,
        required: true
    },
    Contact : {
        type : String,
        required: true
    },
    Email : {
        type : String,
        required: true
    },
    Designation : {
        type : String,
        required: true
    },

})

//customer table and path
const Employee = mongoose.model("Employee",EmployeeSchema);
module.exports = Employee;