const PaymentModel = require('../models/PaymentModel');


//get all paymnets
module.exports.getPayments = async (req, res) => {
   try {
      const payments = await PaymentModel.find();
      res.send(payments);
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
}

//save a payment
module.exports.savePayment = async (req, res) => {
    const { 
        userId,
        fullName, 
        email, 
        address, 
        delAddress, 
        mobile,
        ItemName, 
        unitPrice, 
        units, 
        delFee, 
        total,
        cartTotal,
     } = req.body;

     try {
        const newPayment = new PaymentModel({
            userId,
            fullName, 
            email, 
            address, 
            delAddress, 
            mobile,
            ItemName, 
            unitPrice, 
            units, 
            delFee, 
            total,
            cartTotal
        });
        const savedPayment = await newPayment.save(); 
        //save to db and return the objectId of the new object
        console.log("Saved new Payment Successfully...");
        res.status(201).send(savedPayment);
     } catch (error) {
        console.error(error);
        res.status(500).send("Faild save payment");
     }
}

//delete a payment by id
module.exports.deletePayment = async (req, res) => {
   try {
      const deletePayment = await PaymentModel.findByIdAndRemove(req.params.is).exec();
      return res.json({
         message: "Payment Deleted",
         deletePayment
      });
   } catch (err) {
      return res.json({
         message: "Deletion Failed",
         error: err
      });
   }
}