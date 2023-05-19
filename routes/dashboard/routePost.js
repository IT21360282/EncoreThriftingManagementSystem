const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/sendMail", (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const msg = req.body.msg;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "encorethriftinglk@gmail.com",
      pass: "y k n i c m c j w m j r l m q e",
    },
  });

  const mailOptions = {
    from: "encorethriftinglk@gmail.com",
    to: email,
    subject: subject,
    text: `${msg}\n\nThis is an auto generated email send by the Owner `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error Occurred When Sending Email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email Sent Successfully");
    }
  });
});

module.exports = router;
