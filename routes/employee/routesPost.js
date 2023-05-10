const express = require('express')
const nodemailer=require('nodemailer')
const addEmployeeDetailsModel = require('../../models/employee/modelAddEmployeeDetails')

const router = express.Router()

/* add employee */
router.post('/addEmployee/post', (req, res) => {
    let newEmployeeDetails = new addEmployeeDetailsModel(req.body)

    newEmployeeDetails.save().then(() => {
        console.log('Employee details are saved successfully')
        return res.status(200).json({
            success: "Employee details are saved successfully"
        })
    }).catch((err) => {
        console.error(err)
        return res.status(400).json({
            error: err
        })
    })
})








 //Delete Employee 
router.delete('/employeedelete/delete/:id', (req, res) => {
    addEmployeeDetailsModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('details are deleted successfully')
    }).catch((err) => {
        return res.status(500).send(err)
    })
})

/* Send Emails to Employee */
router.post('/EmployeeMails', (req, res) => {
    
    const empreciever = req.body.empreciever
    const empSubject = req.body.empSubject
    const empmsg = req.body.empmsg

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'encorethriftinglk@gmail.com',
            pass: 't o e l w o i w c i c p r p x q'
        }
    })

    const mailOptions = {
        from: 'encorethriftinglk@gmail.com',
        to: empreciever,
        subject: empSubject,
        text: `${empmsg}\n\nThis is a auto generated email and send by HR manager of Encore Thrifting Store. Please let me know if you have any questions or concerns. I look forward to hearing back from you soon.\n\nThank you for considering our inquiry.\n\nBest regards,\n\nNethmi\n\nEncore - Thrift Store\n\nencorethriftinglk@gmail.com`
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
}
)
module.exports = router
