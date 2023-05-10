const express = require('express')
const supplierupdateModel = require('../../models/supplier/modelSupplier')

const router = express.Router()


/* Update Supplier Details */
router.put('/updatesuppliers/put/:id', (req, res) => {
    const id = req.params.id
    const supName = req.body.supName
    const supMobileNo = req.body.supMobileNo
    const supEmail = req.body.supEmail
    const supType = req.body.supType
    const supTime = req.body.supTime
 
    supplierupdateModel.findByIdAndUpdate(id, {
        supName,
        supMobileNo,
        supEmail,
        supType,
        supTime,
        
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})



module.exports = router