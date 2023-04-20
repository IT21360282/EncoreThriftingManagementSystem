const express = require('express')
const mainCategoryModel = require('../../models/stock/modelMainCategory')
const subCategoryModel = require('../../models/stock/modelSubCategory')
const damagedItemModel = require('../../models/stock/modelDamagedItem')
const disposedItemModel =require('../../models/stock/modelDisposedItem')
const releasedItemModel = require('../../models/stock/modelReleasedItem')

const router = express.Router()

router.post('/maincategory/post', (req, res) => {
    let newMainCategory = new mainCategoryModel(req.body)

    newMainCategory.save().then(() => {
        console.log('category details are saved successfully')
        return res.status(200).json({
            success: "category details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});




router.post('/subcategory/post', (req, res) => {
    let newSubCategory = new subCategoryModel(req.body)

    newSubCategory.save().then(() => {
        console.log('sub category details are saved successfully')
        return res.status(200).json({
            success: "sub category details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});

router.post('/damageditem/post', (req, res) => {
    let newDamagedItem = new damagedItemModel(req.body)

    newDamagedItem.save().then(() => {
        console.log('Damaged Item details are saved successfully')
        return res.status(200).json({
            success: "Damaged Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});

router.post('/disposeditem/post', (req, res) => {
    let newDisposedItem = new disposedItemModel(req.body)

    newDisposedItem.save().then(() => {
        console.log('Disposed Item details are saved successfully')
        return res.status(200).json({
            success: "Disposed Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});


router.post('/releaseditem/post', (req, res) => {
    let newReleasedItem = new releasedItemModel(req.body)

    newReleasedItem.save().then(() => {
        console.log('Released Item details are saved successfully')
        return res.status(200).json({
            success: "Released Item details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        });
    });
});

module.exports = router