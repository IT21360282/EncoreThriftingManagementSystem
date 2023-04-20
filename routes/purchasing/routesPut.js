const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')
const otherPurchaseModel = require('../../models/purchasing/modelOtherPurchase')

const router = express.Router()

router.put('/stockOrder/putOrderStatus/:id', (req, res) => {
    const id = req.params.id
    const orderStatus = req.body.orderStatus
    const confirmedDate = req.body.confirmedDate
    const receivedDate = req.body.receivedDate

    stockOrderModel.findByIdAndUpdate(id, { orderStatus, confirmedDate, receivedDate }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

router.put('/otherPurchase/put/:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const purchasedDate = req.body.purchasedDate
    const purchasedSection = req.body.purchasedSection
    const totalCost = req.body.totalCost
    const totalQty = req.body.totalQty
    const paymentStatus = req.body.paymentStatus
    const shop = req.body.shop
    const purchasedItems = req.body.purchasedItems
    const purchasedItemQuantities = req.body.purchasedItemQuantities
    const purchasedItemUnitPrices = req.body.purchasedItemUnitPrices

    otherPurchaseModel.findByIdAndUpdate(id, {
        title,
        purchasedDate,
        purchasedSection,
        totalCost,
        totalQty,
        paymentStatus,
        shop,
        purchasedItems,
        purchasedItemQuantities,
        purchasedItemUnitPrices
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

module.exports = router