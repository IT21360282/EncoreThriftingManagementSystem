const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')

const router = express.Router()

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

module.exports = router