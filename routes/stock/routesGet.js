const express = require('express')
    //const categoryModel = require('../../models/stock/modelMainCategory')
const subCategoryModel = require('../../models/stock/modelItemNew')
const DamagedItemModel = require('../../models/stock/modelDamagedItem')
const DisposedItemModel = require('../../models/stock/modelDisposedItem')
    //const ReleasedItemModel = require('../../models/stock/modelReleasedItem')


const SentItem = require('../../models/stock/modelSentEmail');

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
    subCategoryModel.find().sort({ _id: -1 }).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/subcategory/get/:id', (req, res) => {
    subCategoryModel.findById(req.params.id).exec().then((results) => {
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
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

router.get('/damageditem/get/:id', (req, res) => {
    DamagedItemModel.findById(req.params.id).exec().then((results) => {
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
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

router.get('/disposeditem/get/:id', (req, res) => {
    DisposedItemModel.findById(req.params.id).exec().then((results) => {
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
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

router.get('/releaseditem/get/:id', (req, res) => {
    ReleasedItemModel.findById(req.params.id).exec().then((results) => {
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})






router.get('/subcategory/get', async(req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





const path = require('path');

router.get('stock/getemail', (req, res) => {
    res.sendFile(path.join(__dirname, 'SendMailForm.js'));
});








module.exports = router