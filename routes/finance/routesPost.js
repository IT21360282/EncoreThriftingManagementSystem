const express = require('express')
const financeModel = require('../../models/finance/modelpayment')

const nodemailer = require('nodemailer')


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

/* financial - Email */

router.post('/SendEmail', (req, res) => {
    const to = req.body.to
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
        text: `${msg}\n\nThis is an auto generated email send by the Financial manager `
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