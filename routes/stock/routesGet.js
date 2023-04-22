const express = require('express')
const categoryModel = require('../../models/stock/modelMainCategory')
const subCategoryModel= require('../../models/stock/modelSubCategory')
const DamagedItemModel = require('../../models/stock/modelDamagedItem')
const DisposedItemModel= require('../../models/stock/modelDisposedItem')
const ReleasedItemModel = require('../../models/stock/modelReleasedItem')

const router = express.Router()

router.get('/maincategory/get', (req, res) => {
    categoryModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


router.get('/subcategory/get', (req, res) => {
    subCategoryModel.find().sort({_id:-1}).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/subcategory/get/:id',(req,res)=>{
    subCategoryModel.findById(req.params.id).exec().then((results)=>{
        return res.status(200).json({
            success:true,
            existingDetails:results
        })
    }).catch((err)=>{
        console.error(err)
    })
})


//damged stock
router.get('/damageditem/get', (req, res) => {
    DamagedItemModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/damageditem/get/:id',(req,res)=>{
    DamagedItemModel.findById(req.params.id).exec().then((results)=>{
        return res.status(200).json({
            success:true,
            existingDetails:results
        })
    }).catch((err)=>{
        console.error(err)
    })
})

//disposed stock

router.get('/disposeditem/get', (req, res) => {
    DisposedItemModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/disposeditem/get/:id',(req,res)=>{
    DisposedItemModel.findById(req.params.id).exec().then((results)=>{
        return res.status(200).json({
            success:true,
            existingDetails:results
        })
    }).catch((err)=>{
        console.error(err)
    })
})

//Released Item

router.get('/releaseditem/get', (req, res) => {
    ReleasedItemModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/releaseditem/get/:id',(req,res)=>{
    ReleasedItemModel.findById(req.params.id).exec().then((results)=>{
        return res.status(200).json({
            success:true,
            existingDetails:results
        })
    }).catch((err)=>{
        console.error(err)
    })
})



router.get('/', async (req, res) => {
    try {
      const docs = await YourModel.find();
      res.json(docs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router