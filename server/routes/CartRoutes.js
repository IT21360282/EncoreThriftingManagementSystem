const { Router } = require('express');
const { addToCart, getCartItems, deleteCartItemById, updateItemQuantity } = require('../controllers/CartControllers');
// const cartModel = require('../models/CartModel')


const router = Router();


router.post('/addToCart', addToCart);
router.get('/getCart', getCartItems);
router.delete('/deleteItem/:id', deleteCartItemById);
router.put('/updateQuantity/:id', updateItemQuantity)



module.exports = router;
