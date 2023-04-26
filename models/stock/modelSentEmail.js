const mongoose = require('mongoose')

const sentEmail = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },

    inventoryReciver:{
        type:String,
        required:false
    },
    inventorySubject:{
        type:String,
        required:false
    },
    inventoryMsg:{
        type:String,
        required:false
    }
    
})

module.exports = mongoose.model('sent_email', sentEmail)