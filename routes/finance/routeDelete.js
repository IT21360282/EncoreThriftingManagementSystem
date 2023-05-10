const express = require('express')
const otherfinanceModel = require('../../models/finance/modelpayment')
const otherbankModel = require('../../models/finance/modelbank')

const router = express.Router()

router.delete('/financepayment/delete/:id', (req, res) => {
    otherfinanceModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('payment details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})



router.delete('/financebank/delete/:id', (req, res) => {
    otherbankModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('bank details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

module.exports = router