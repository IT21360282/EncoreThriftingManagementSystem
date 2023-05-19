const Cart = require('../models/CartModel');
const ItemDetails = require('../models/itemDetails');

//get cart
module.exports.getCartItems =  async (req, res) => {
    try {
      const items = await Cart.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//add item to cart
module.exports.addToCart = async (req,res) => {
    try{
        const { _id, userId, itemId, pImageURL, pName, pDescription, pPrice, quantity } = req.body;

        //create a  new item in cart
        const CartItem = new Cart({ userId, itemId, pImageURL, pName, pDescription, pPrice, quantity });
        await CartItem.save();
        res.json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//delete item by id
module.exports.deleteCartItemById = async (req, res) => {
  try {
    const deleteItem = await Cart.findByIdAndRemove(req.params.id).exec();
    return res.json({
      message: "Item Deleted From Cart",
      deleteItem,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete Unsuccessful",
      error: err
    });
  }
};

//update item quantity
module.exports.updateItemQuantity = async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(req.params.id, {quantity: req.body.quantity}, {new: true});
    return res.status(200).json({
      success: "Quantity updated successfully",
      item,
    })
  } catch (err) {
    return res.status(400).json({
      error: err.messsage,
    });
  }
};