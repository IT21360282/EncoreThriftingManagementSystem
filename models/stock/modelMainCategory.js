const mongoose = require('mongoose')

const mainCategoryStock = new mongoose.Schema({

    cID: {
        type: String,
        required: true
    },
    cName: {
        type: String,
        required: true
    },
    

})

module.exports = mongoose.model('main_Category', mainCategoryStock)