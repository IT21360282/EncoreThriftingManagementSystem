const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')
const otherPurchaseModel = require('../../models/purchasing/modelOtherPurchase')

const router = express.Router()

router.delete('/stockOrder/delete/:id', (req, res) => {
    stockOrderModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('Order details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

router.delete('/otherPurchase/delete/:id', (req, res) => {
    otherPurchaseModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('Other purchase details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

module.exports = router