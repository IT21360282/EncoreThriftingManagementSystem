const Item = require("../models/itemDetails");
// const express = require('express');
// const router = express.Router();


// module.exports.saveItem = async (req, res) => {
//     const {
//         pName='Pink Baggy Shirt Blouse',
//         pCategory='Clothes',
//         pSubCategory='Blouse',
//         pQuantity='10',
//         pLevel='10',
//         pPrice='2500',
//         pPlacedDate='2023-04-24',
//         pImageURL='https://www.bing.com/images/search?view=detailV2&ccid=%2bW%2bEAdx5&id=0F442147D1D5A2CD57CAA789100AE018B79BB1BD&thid=OIP.-W-EAdx5Zc0juOBfYZ0ySgHaMU&mediaurl=https%3a%2f%2fimages-na.ssl-images-amazon.com%2fimages%2fI%2f61S7xTsu0jS._AC_UL1058_.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.f96f8401dc7965cd23b8e05f619d324a%3frik%3dvbGbtxjgChCJpw%26pid%3dImgRaw%26r%3d0&exph=1058&expw=636&q=baggy+t+shirt+blouse+pink&simid=608020889740580693&FORM=IRPRST&ck=77FCCD6719CF4D88D6ED51BF077A93A2&selectedIndex=3',
//         pDescription='AngelSpace Womens V Neck Short-Sleeve Solid Baggy Fashional Spring Summer T-Shirt',
//     } = req.body;

//     try {
//         const newItem = new Item({ 
//             pName,
//             pCategory,
//             pSubCategory,
//             pQuantity,
//             pLevel,
//             pPrice,
//             pPlacedDate,
//             pImageURL,
//             pDescription
//         });
//         const savedItem = await newItem.save();
//         console.log('Saved successfully...');
//         res.status(201).send(savedItem);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// };


// GET method to retrieve all items
module.exports.getItems =  async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//   module.exports = router;

// module.exports.getItemById = async (req, res) => {
//   try {
//     const itemId = props.match.params.itemId;
//     // const item = getItemById(itemId);
//     const item = await Item.findById(itemId);
//     if (item) {
//       res.json(item);
//     } else {
//       res.status(404).json({ message: "Item not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };