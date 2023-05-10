const express = require('express')
const financeModel = require('../../models/finance/modelpayment')

const router = express.Router()

router.get('/financeshow/get', (req, res) => {
    financeModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/financeshow/getSpec/:id', (req, res) => {
    financeModel.findById(req.params.id).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

const bankModel = require('../../models/finance/modelbank')

router.get('/bankshow/get', (req, res) => {
    bankModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})

router.get('/bankshow/getSpec/:id', (req, res) => {
    bankModel.findById(req.params.id).exec().then((results) => {
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