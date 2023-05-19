const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
      userId: {
        type: String,
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item_details',
        
      },
      pImageURL: {
        type: String,
        
      },
      pName: {
        type: String,
        
      },
      pDescription: {
        type: String,
        
      },
      pPrice: {
        type: Number,
        
      },
      quantity: {
        type: Number,
        default: 1
      }
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
