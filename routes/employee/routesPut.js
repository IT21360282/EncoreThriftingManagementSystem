/*const express = require('express')
const updateEmployeeDetailsModel = require('../../models/employee/modelUpdateEmployeeDetails')

router.put('/employee/:id', async (req, res) => {
    const employeeId = req.params.id;
    const { empName, empNIC, empEmail, empMobileNo, empPost } = req.body;
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, { empName, empNIC, empEmail, empMobileNo, empPost }, { new: true });
      res.send(updatedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
*/

const express = require('express')
const addEmployeeDetailsModel = require('../../models/employee/modelAddEmployeeDetails')

const router = express.Router()


/* Update Employee Details */
router.put('/updateemployee/put/:id', (req, res) => {
    const id = req.params.id
    const empName = req.body.empName
    const empNIC = req.body.empNIC
    const empEmail = req.body.empEmail
    const empMobileNo = req.body.empMobileNo
    const empPost = req.body.empPost
 
    addEmployeeDetailsModel.findByIdAndUpdate(id, {
        empName,
        empNIC,
        empEmail,
        empMobileNo,
        empPost,
        
    }, { new: true }).then(() => {
        res.send("successfuly updated")
    }).catch((err) => {
        return res.status(500).send('Error orcurred')
    })
})



module.exports = router