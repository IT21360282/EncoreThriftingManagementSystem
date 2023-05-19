const express = require('express')
const supplierModel = require('../../models/supplier/modelSupplier')
const supplierupdateModel = require('../../models/supplier/modelSupplier')


const router = express.Router()

/* Add Suppliers */
router.get('/supplieravailable/get', (req, res) => {
    supplierModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


/* Update Supplier Details */
router.get('/updatesuppliers/get/:id', (req, res) => {
    supplierupdateModel.findById(req.params.id).exec().then((result) => {
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


/*  Search Supplier Details   */
router.get('/supplierdetails/search', (req, res) => {
    const orderQuery = req.query.q
    const regex = new RegExp(orderQuery, 'i')

    supplierModel.find({ $or: [{ supID: regex },{ supName: regex }, { supEmail: regex },{ supType: regex },{ supTime: regex }] }).then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            searchedDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


/*
router.get('/searchapi/search', async (req, res) => {
    try {
      const searchQuery = req.query.q;
      const results = await supplierModel.find({ $text: { $search: searchQuery } });
      res.json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

*/

module.exports = router