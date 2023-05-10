const express = require('express')
const addEmployeeDetailsModel = require('../../models/employee/modelAddEmployeeDetails')

const router = express.Router()

router.get('/addEmployeeDetails/get', (req, res) => {
    addEmployeeDetailsModel.find().exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


router.get('/updateEmployeeDetails/get/:id', (req, res) => {
    addEmployeeDetailsModel.findById(req.params.id).exec().then((results) => {
        console.log(results)
        return res.status(200).json({
            success: true,
            existingDetails: results
        })
    }).catch((err) => {
        console.error(err)
    })
})


router.get('/employeeDetails/search', (req, res) => {
    const orderQuery = req.query.q
    const regex = new RegExp(orderQuery, 'i')

    addEmployeeDetailsModel.find({ $or: [{ empID: regex }, { empName: regex }, { empNIC: regex }, { empMobileNo: regex }] }).then((results) => {
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

