const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')
const otherPurchaseModel = require('../../models/purchasing/modelOtherPurchase')


const router = express.Router()

router.post('/stockOrder/post', (req, res) => {
    let newStockOrder = new stockOrderModel(req.body)

    newStockOrder.save().then(() => {
        console.log('Stock order details are saved successfully')
        return res.status(200).json({
            success: "Stock order details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})

router.post('/otherPurchase/post', (req, res) => {
    let newOtherPurchase = new otherPurchaseModel(req.body)

    newOtherPurchase.save().then(() => {
        console.log('Other purchase details are saved successfully')
        return res.status(200).json({
            success: "Other purchase details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})

module.exports = router