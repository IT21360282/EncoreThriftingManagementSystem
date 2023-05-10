const express = require('express')
const otherfinanceModel = require('../../models/finance/modelpayment')
const otherbankModel = require('../../models/finance/modelbank')

const router = express.Router()

router.put('/otherfinance/put/:id', (req, res) => {
    const paymentid = req.params.id
    const FullName = req.body.FullName
    const Pay_Type = req.body.Pay_Type
    const Amount = req.body.Amount
    const Pay_Date = req.body.Pay_Date
    const Card_Number = req.body.Card_Number
    const Expired_Year = req.body.Expired_Year
    const CVC = req.body.CVC
    
    otherfinanceModel.findByIdAndUpdate(paymentid, {
        FullName,
        Pay_Type,
        Amount,
        Pay_Date,
        Card_Number,
        Expired_Year,
        CVC,
       
        
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

// bank 

router.put('/otherbank/put/:id', (req, res) => {
    const B_No = req.params.id
    const B_Name = req.body.B_Name
    const Br_Name = req.body.Br_Name
    const Acc_No= req.body.Acc_No
    const SWIFT = req.body.SWIFT
    const Acc_Cur = req.body.Acc_Cur
    const Acc_Type = req.body.Acc_Type
    
    
    otherbankModel.findByIdAndUpdate(B_No, {
        B_Name,
        Br_Name,
        Acc_No,
        SWIFT,
        Acc_Cur,
        Acc_Type,
          
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})

module.exports = router