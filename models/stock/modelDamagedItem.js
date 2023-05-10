const mongoose = require('mongoose')

const damagedItem = new mongoose.Schema({

    
    pName: {
        type: String,
        required:false
    },

    pCategory: {
        type: String,
        required:false
    },

    pSubCategory: {
        type: String,
        required:false
    },

    pQuantity: {
        type: Number,
        required:false
    },
    pPrice: {
        type: String,
        required:false
    },
    pImageURL:{
        type:String,
        required:false
    },
    pReason:{
        type:String,
        required:false
    },
    pPlacedDate:{
        type:String,
        required:false
    }
    
    
    

})

module.exports = mongoose.model('damaged_item', damagedItem)