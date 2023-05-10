const express = require('express')
const nodemailer = require('nodemailer')
const stockOrderModel = require('../../models/purchasing/modelStockOrder')
const otherPurchaseModel = require('../../models/purchasing/modelOtherPurchase')


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

router.post('/otherPurchase/post', (req, res) => {
    let newOtherPurchase = new otherPurchaseModel(req.body)

    newOtherPurchase.save().then(() => {
        console.log('Other purchase details are saved successfully')
        return res.status(200).json({
            success: "Other purchase details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})


/*Send Email*/

router.post('/sendEmail', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const msg = req.body.msg

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'encorethriftinglk@gmail.com',
            pass: 'y k n i c m c j w m j r l m q e'
        }
    })

    const mailOptions = {
        from: 'encorethriftinglk@gmail.com',
        to: email,
        subject: subject,
        text: `Dear ${name},\n\n${msg}\n\nThis is a auto generated email and send by Purchasing Management System of Encore Thrifting Main System`
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