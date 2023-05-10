const express = require('express')
const subCategoryDelete = require('../../models/stock/modelItemNew')
const damagedItemDelete = require('../../models/stock/modelDamagedItem')
const disposedItemDelete = require('../../models/stock/modelDisposedItem')
    //const releasedItemDelete = require('../../models/stock/modelReleasedItem')


const router = express.Router()

router.delete('/subcategory/delete/:id', (req, res) => {
    subCategoryDelete.findByIdAndDelete(req.params.id).then(() => {
        res.send('sub category deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error occurred')
    })
})


//damaged item delete
router.delete('/damageditem/delete/:id', (req, res) => {
    damagedItemDelete.findByIdAndDelete(req.params.id).then(() => {
        res.send('sub category deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error occurred')
    })
})


//disposed item delete
router.delete('/disposeditem/delete/:id', (req, res) => {
    disposedItemDelete.findByIdAndDelete(req.params.id).then(() => {
        res.send('sub category deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error occurred')
    })
})



router.delete('/released/delete/:id', (req, res) => {
    releasedItemDelete.findByIdAndDelete(req.params.id).then(() => {
        res.send('sub category deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error occurred')
    })
})


module.exports = router