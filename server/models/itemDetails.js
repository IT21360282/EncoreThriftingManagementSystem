const mongoose = require('mongoose')

const itemDetails = new mongoose.Schema({
    pName:{
        type:String,
        required:true
    },

    pCategory:{
        type:String,
        required:false
    },
    pSubCategory:{
        type:String,
        required:false
    },
    pQuantity:{
        type:String,
        required:false
    },
    pLevel:{
        type:String,
        required:false
    },
    pPrice:{
        type:String,
        required:false
    },
    pPlacedDate:{
        type:String,
        required:false
    },

    
    
    pImageURL:{
        type:String,
        required:false
    },
    pDescription: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('item_details', itemDetails)