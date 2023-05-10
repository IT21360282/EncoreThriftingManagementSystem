const express = require('express')
const financeModel = require('../../models/finance/modelpayment')

const router = express.Router()

router.post('/financeshow/post', (req, res) => {
    let newpaymentshow = new financeModel(req.body)

    newpaymentshow.save().then(() => {
        console.log('Payment details are saved successfully')
        return res.status(200).json({
            success: "Payment details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})

const bankModel = require('../../models/finance/modelbank')


router.post('/bankshow/post', (req, res) => {
    let newbankshow = new bankModel(req.body)

    newbankshow.save().then(() => {
        console.log('Bank details are saved successfully')
        return res.status(200).json({
            success: "Bank details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})

module.exports = router