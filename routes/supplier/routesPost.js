const nodemailer=require('nodemailer')
const express = require('express')
const supplierModel = require('../../models/supplier/modelSupplier')
const supplierdeleteModel = require('../../models/supplier/modelSupplier')

const router = express.Router()

/* Add Suppliers */
router.post('/supplieravailable/post', (req, res) => {
    let newsupplieravailable = new supplierModel(req.body)

    newsupplieravailable.save().then(() => {
        console.log('Supplier details are saved successfully')
        return res.status(200).json({
            success: "Supplier details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})



/* Delete Suppliers */
router.delete('/supplierdelete/delete/:id', (req, res) => {
    supplierdeleteModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})



/* Send Emails to Supplier */
router.post('/sendEmailSupplier', (req, res) => {
    
    const supreciever = req.body.supreciever
    const supSubject = req.body.supSubject
    const supmsg = req.body.supmsg

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'encorethriftinglk@gmail.com',
            pass: 't o e l w o i w c i c p r p x q'
        }
    })

    const mailOptions = {
        from: 'encorethriftinglk@gmail.com',
        to: supreciever,
        subject: supSubject,
        text: `${supmsg}\n\nThis is a auto generated email and send by Supply Chain Mananger of Encore Thrifting Store.Please let me know if you have any questions or concerns. I look forward to hearing back from you soon.\n\nThank you for considering our inquiry.\n\nBest regards,\n\nDhanuka\n\nEncore - Thrift Store\n\nencorethriftinglk@gmail.com`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error Occurred When Sending Email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email Sent Successfully');
        }
    })
})

module.exports = router