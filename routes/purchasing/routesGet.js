const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')
const otherPurchaseModel = require('../../models/purchasing/modelOtherPurchase')

const router = express.Router()

//APIs for Stock Orders
router.get('/stockOrder/get', (req, res) => {
    stockOrderModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/getSorted', (req, res) => {
    stockOrderModel.find().sort({ _id: -1 }).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/get/:id', (req, res) => {
    stockOrderModel.findById(req.params.id).exec().then((result) => {
        console.log(result)
        return res.status(200).json({
            success: true,
            existingDetails: result
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/getLastFourOrder', (req, res) => {
    stockOrderModel.find().sort({ _id: -1 }).limit(4).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

//APIs for OtherPurchases
router.get('/otherPurchase/get', (req, res) => {
    otherPurchaseModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
        return res.json({
            success: false,
        })
    })
})

router.get('/otherPurchase/getSorted', (req, res) => {
    otherPurchaseModel.find().sort({ _id: -1 }).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
        return res.json({
            success: false,
        })
    })
})

router.get('/otherPurchase/get/:id', (req, res) => {
    otherPurchaseModel.findById(req.params.id).exec().then((result) => {
        console.log(result)
        return res.status(200).json({
            success: true,
            existingDetails: result
        })
    }).catch((err) => {
        console.error(err)
        return res.json({
            success: false,
        })
    })
})

router.get('/otherPurchase/getLastFourOrder', (req, res) => {
    otherPurchaseModel.find().sort({ _id: -1 }).limit(4).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
        return res.json({
            success: false,
        })
    })
})

//Search APIs for Stock Orders
router.get('/stockOrder/received', (req, res) => {
    stockOrderModel.find({ orderStatus: "Received" }).sort({ _id: -1 }).limit(4).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            receivedOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/receivedAll', (req, res) => {
    stockOrderModel.find({ orderStatus: "Received" }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            receivedOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/pending', (req, res) => {
    stockOrderModel.find({ orderStatus: "Pending" }).sort({ _id: -1 }).limit(4).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            pendingOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/pendingAll', (req, res) => {
    stockOrderModel.find({ orderStatus: "Pending" }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            pendingOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/confirmation-pending', (req, res) => {
    stockOrderModel.find({ orderStatus: "Confirmation Pending" }).sort({ _id: -1 }).limit(4).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            confirmationPendingOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/confirmation-pendingAll', (req, res) => {
    stockOrderModel.find({ orderStatus: "Confirmation Pending" }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            confirmationPendingOrders: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/stockOrder/search', (req, res) => {
    const orderQuery = req.query.q
    const regex = new RegExp(orderQuery, 'i')

    stockOrderModel.find({ $or: [{ title: regex }, { supplier: regex }, { purDigitID: regex }, { purID: regex }] }).sort({ _id: -1 }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


//Search APIs for Other Purchases
router.get('/otherPurchase/search', (req, res) => {
    const purchaseQuery = req.query.q
    const regex = new RegExp(purchaseQuery, 'i')

    otherPurchaseModel.find({ $or: [{ title: regex }, { shop: regex }, { purDigitID: regex }, { purID: regex }] }).sort({ _id: -1 }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})



//report generating APIs

router.get('/stockOrder/search', (req, res) => {
    const purchaseQuery = req.query.q
    const regex = new RegExp(purchaseQuery, 'i')

    otherPurchaseModel.find({ $or: [{ title: regex }, { shop: regex }, { purDigitID: regex }, { purID: regex }] }).sort({ _id: -1 }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

module.exports = router