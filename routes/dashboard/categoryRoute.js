const router = require("express").Router();
const { request } = require("express");
let categoryModel = require("../../models/dashboard/categoryModel.js");



//add data to Employee table
//./Employee/add
//Post request
//http://localhost:8050/Employee/add
router.route("/add").post((req,res)=>{
    const Cname = req.body.Cname;
    const CID = req.body.CID;
    const Price = req.body.Price;
    const Ctype = req.body.Ctype;
   
    const newCategory = new categoryModel({
        Cname,
        CID ,
        Price,
        Ctype,
       
    })

    newCategory.save().then(()=>{
        res.json("Category Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//search Employee
//http://localhost:8050/Employee/
//Get Request
router.route("/").get((req,res)=>{
    categoryModel.find().then((Category)=>{
        res.json(Category)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//http://localhost:8090/Employee/update/:id
//Put Request
router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const { Cname,CID,Price,Ctype} = req.body;
    const updateUser = {
        Cname ,
        CID,
        Price,
        Ctype,
        
    }

    const update = await categoryModel.findByIdAndUpdate(userId,updateUser).then(()=>{
        res.status(200).send({status: "Category Updated"})
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

    await categoryModel.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Category deleted"});
    }).catch((err)=>{
        console.log(err);
    })
})

//find one of the Employee
router.route("/get/:id").get((req,res)=>{
    let id = req.params.id;
    categoryModel.find({Cname:id}).then((user)=>{
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