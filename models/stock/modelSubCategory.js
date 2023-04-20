const mongoose = require('mongoose')

const subCategoryStock = new mongoose.Schema({

    pId: {
        type: String,
        unique: true,
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
    pPlacedDate:{

        type: String,
        required:true
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

module.exports = mongoose.model('sub_Category', subCategoryStock)