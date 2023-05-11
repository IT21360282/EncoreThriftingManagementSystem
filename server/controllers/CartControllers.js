const Cart = require('../models/CartModel');
const ItemDetails = require('../models/itemDetails');


// module.exports.addToCart = async (req, res) => {
//     const { itemId } = req.body;

//     try {
//       // Get the item details from the item_details collection based on the itemId
//       const item = await ItemDetails.findById(itemId);

//       // Check if the item exists
//       if (!item) {
//         return res.status(404).json({ message: 'Item not found' });
//       }

//       // Create a new cart object with the item details
//       const cart = new Cart({
//         user: req.user.id,
//         items: [{
//           product: item._id,
//           price: item.pPrice,
//         }],
//       });

//       // Save the cart object
//       const savedCart = await cart.save();

//       console.log('Item added to cart successfully');
//       res.status(201).json({ message: 'Item added to cart successfully', cart: savedCart });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };

exports.addToCart = (req, res) => {
    let saveCart = new Cart(req.body)

    saveCart.save().then(() => {
        console.log('Added')
        return res.status(200).json({
            success: "Added"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err   
        })    
    })

};