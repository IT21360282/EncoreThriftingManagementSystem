const mongoose = require('mongoose')

const releasedItem = new mongoose.Schema({

    pId: {
        type: String,
        
        required: true,
    },
    pName: {
        type: String,
        required: false
    },
    pCategory: {
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

module.exports = mongoose.model('released_item', releasedItem)