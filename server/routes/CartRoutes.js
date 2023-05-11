const { Router } = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/CartControllers');
const { userData, userSignin } = require('../controllers/UserControllers')


const router = Router();

// router.get('/getCart', getCart);
router.post('/addToCart', addToCart);
// router.delete('/:id', removeFromCart);

module.exports = router;