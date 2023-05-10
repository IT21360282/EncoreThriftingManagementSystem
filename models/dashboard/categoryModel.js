const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    Cname : {
        type : String,
        required: true
    },
    CID: {
        type: Number,
        required: true
    },
   
    Price : {
        type : String,
        required: true
    },
 
    Ctype : {
        type : String,
        required: true
    },

})

//customer table and path
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;