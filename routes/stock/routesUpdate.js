const express = require('express')
const subCategoryModel = require('../../models/stock/modelItemNew')


const router = express.Router()

router.put('/subcategory/update/:id',(req,res)=>{
    const id = req.params.id
    const pName = req.body.pName
    const pCategory = req.body.pCategory
    const pQuantity = req.body.pQuantity
    const pPrice = req.body.pPrice
    const pPlacedDate = req.body.pPlacedDate
    const pImageURL = req.body.pImageURL
    const pDescription = req.body.pDescription

    subCategoryModel.findByIdAndUpdate(id,{pName,pCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pDescription},{new:true}).then(()=>{
        res.send("Succesfully updated")
    }).catch((err)=>{
        return res.status(500).send("Error Occured")
    })
})


module.exports = router