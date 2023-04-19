const router = require("express").Router();
const { request } = require("express");
let EmployeeModel = require("../../models/dashboard/employeeModel.js");

//add data to Employee table
//./Employee/add
//Post request
//http://localhost:8050/Employee/add
router.route("/add").post((req,res)=>{
    const First_name = req.body.First_name;
    const Last_name = req.body.Last_name;
    const NIC = req.body.NIC;
    const Address = req.body.Address;
    const Contact = req.body.Contact;
    const Email = req.body.Email;
    const Designation = req.body.Designation;
    

    const newEmployee = new EmployeeModel({
        First_name,
        Last_name,
        NIC,
        Address,
        Contact,
        Email,
        Designation
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//search Employee
//http://localhost:8050/Employee/
//Get Request
router.route("/").get((req,res)=>{
    EmployeeModel.find().then((Employee)=>{
        res.json(Employee)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//http://localhost:8090/Employee/update/:id
//Put Request
router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const { First_name,Last_name,NIC,Address,Contact,Email,Designation} = req.body;
    const updateUser = {
        First_name,
        Last_name,
        NIC,
        Address,
        Contact,
        Email,
        Designation
    }

    const update = await EmployeeModel.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status: "Employee Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

//delete Employee
//http://localhost:8050/Employee/delete/:id
//Delete Request
router.route("/delete/:id").delete(async (req, res)=>{
    let userId = req.params.id;

    await EmployeeModel.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Employee deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the Employee
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    EmployeeModel.find({First_name:id}).then((user)=>{
        res.json(user)
    }).catch((err)=>{
        console.log(err);
    })
})

//Updateone
// router.route("/updateOne/:id").put(async (req, res) => {
//     let Employee = await EmployeeModel.findById(req.params.id);
//     const data = {
//         Name: req.body.Name || Employee.Name,
//         Address: req.body.Address || Employee.Address,
//         PhoneNumber: req.body.PhoneNumber || Employee.PhoneNumber,
//         NICNumber: req.body.NICNumber || Employee.NICNumber,
//         Jobtitle: req.body.Jobtitle || Employee.Jobtitle,
//         Salary: req.body.Salary || Employee.Salary,


//     };
//     Employee = await EmployeeModel.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json(Employee);
// });


module.exports = router;