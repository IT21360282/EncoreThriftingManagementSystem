const mongoose = require('mongoose')

const itemDetails =  mongoose.Schema({
    pName:{
        type:String,
        required:false
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
        required: false
    }
})

module.exports = mongoose.model('item_details', itemDetails)