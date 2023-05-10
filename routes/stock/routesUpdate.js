const express = require('express')
const subCategoryModel = require('../../models/stock/modelItemNew')
const deleteItemModel = require('../../models/stock/modelDamagedItem')
const disposedItemModel = require('../../models/stock/modelDisposedItem')


const router = express.Router()

router.put('/subcategory/update/:id',(req,res)=>{
    const id = req.params.id
    const pName = req.body.pName
    const pCategory = req.body.pCategory
    const pSubCategory = req.body.pSubCategory
    const pQuantity = req.body.pQuantity
    const pPrice = req.body.pPrice
    const pPlacedDate = req.body.pPlacedDate
    const pImageURL = req.body.pImageURL
    const pDescription = req.body.pDescription

    subCategoryModel.findByIdAndUpdate(id,{pName,pCategory,pSubCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pDescription},{new:true}).then(()=>{
        res.send("Succesfully updated")
    }).catch((err)=>{
        return res.status(500).send("Error Occured")
    })
})




// update damaged item
router.put('/damageditem/update/:id',(req,res)=>{
    const id = req.params.id
    const pName = req.body.pName
    const pCategory = req.body.pCategory
    const pSubCategory = req.body.pSubCategory
    const pQuantity = req.body.pQuantity
    const pPrice = req.body.pPrice
    const pPlacedDate = req.body.pPlacedDate
    const pImageURL = req.body.pImageURL
    const pReason = req.body.pReason

    deleteItemModel.findByIdAndUpdate(id,{pName,pCategory,pSubCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pReason},{new:true}).then(()=>{
        res.send("Succesfully updated")
    }).catch((err)=>{
        return res.status(500).send("Error Occured")
    })
})


// update disposed item
router.put('/disposed/update/:id',(req,res)=>{
    const id = req.params.id
    const pName = req.body.pName
    const pCategory = req.body.pCategory
    const pSubCategory = req.body.pSubCategory
    const pQuantity = req.body.pQuantity
    const pPrice = req.body.pPrice
    const pPlacedDate = req.body.pPlacedDate
    const pImageURL = req.body.pImageURL
    const pReason = req.body.pReason

    disposedItemModel.findByIdAndUpdate(id,{pName,pCategory,pSubCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pReason},{new:true}).then(()=>{
        res.send("Succesfully updated")
    }).catch((err)=>{
        return res.status(500).send("Error Occured")
    })
})




module.exports = router