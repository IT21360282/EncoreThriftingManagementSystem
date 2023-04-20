const express = require('express')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')

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





module.exports = router