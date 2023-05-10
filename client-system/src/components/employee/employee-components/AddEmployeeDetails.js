import React, { Component } from 'react'
import axios from 'axios'
import '../employee.css'

export default class AddEmployeeDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      empID: "",
      empName: "",
      empNIC: "",
      empEmail: "",
      empMobileNo: "",
      empPost: "",
    }
    this.onSubmitDetails=this.onSubmitDetails.bind(this)
    this.haddleInputChanges=this.haddleInputChanges.bind(this)
  }

  haddleInputChanges = (event) => {
    const {name,value} = event.target
    this.setState({
      ...this.state, [name]:value
    })
    
  }

  onSubmitDetails(){

    const {empID, empName, empNIC, empEmail, empMobileNo, empPost} = this.state

    const data = {
      empID:empID,
      empName:empName,
      empNIC:empNIC,
      empMobileNo:empMobileNo,
      empEmail:empEmail,
      empPost:empPost,
    }

    axios.post("http://localhost:8000/employeePost/addEmployee/post",data).then((res) => {
      this.setState({
        empID: "",
        empName: "",
        empNIC: "",
        empEmail: "",
        empMobileNo: "",
        empPost: "",
      })
    })
  }

render() {
  return (

    <div>
      <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Add a New Employee</h2>
      
    
      <div id="Employeerectangle">
      <div className='inline-formsEmployee'>
          
          <br></br><br></br>
          <table>
          <tr>
            <td><label>ID : </label></td>
            <td><input type='text' className='form-inputEmployee' name='empID' value={this.state.empID} onChange={this.haddleInputChanges} placeholder='Enter Employee Id'/></td>
          </tr>
          <tr>
            <td><label>Name : </label></td>
            <td><input type='text' className='form-inputEmployee' name='empName' value={this.state.empName} onChange={this.haddleInputChanges} placeholder='Enter Employee Name'/></td>
          </tr>

          <tr>
            <td><label>NIC : </label></td>
            <td><input type='text' className='form-inputEmployee' name='empNIC' value={this.state.empNIC} onChange={this.haddleInputChanges} placeholder='Enter NIC number'/></td>
          </tr>

          <tr>
           <td> <label>Email : </label></td>
          <td><input type='text' className='form-inputEmployee' name='empEmail' value={this.state.empEmail} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder='employee@gmail.com'/></td>
          </tr>

          <tr>
           <td> <label>Mobile No : </label></td>
          <td><input type='text' className='form-inputEmployee' name='empMobileNo' value={this.state.empMobileNo} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder="0??????????"    /></td>
          </tr>

          <tr>
            <td><label> Post: </label></td>
            <select className='form-select' name='empPost' value={this.state.empPost} onChange={this.haddleInputChanges} style={{width:"240%", marginTop:"20px"}}  >
              <option>Select One</option>
              <option>Delivery drivers</option>
              <option>Secuirity officer</option>
              <option>Inventory keepers</option>
              <option>Cleaner</option>
              
            </select></tr>
            


            <a href='/employee/DisplayAllEmployeeDetails'><button type='submit' className='btn btn-success' onClick={this.onSubmitDetails} style={{marginLeft:"200px", marginTop:"20px"}}>ADD</button></a>
            
          </table>
          </div>
          
          <br></br>
      </div>
      <br/>
    </div>





  )
}
}

