import React, { Component } from 'react'
import axios from 'axios'
import '../employee.css'

export default class EmployeeLeave extends Component {
  constructor(props){
    super(props)
    this.state = {
      empID: "E001",
      empName: "",
      empEmail: "",
      empMobileNo: "",
      empPost: "",
      fromDate:"",
      toDate:"",
      typeOfLeave:"",
      description:"",
    }
    this.onSubmitDetails=this.onSubmitDetails.bind(this)
    this.haddleInputChanges=this.haddleInputChanges.bind(this)
  }

  haddleInputChanges = (event) => {
    const {name,value} = event.target
    this.setState({
      ...this.setState, [name]:value
    })
    
  }

  onSubmitDetails(){

    const {empID, empName, empEmail, empMobileNo, empPost, fromDate, toDate, typeOfLeave, description } = this.state

    const data = {
      empID:empID,
      empName:empName,
      empMobileNo:empMobileNo,
      empEmail:empEmail,
      empPost:empPost,
      fromDate:fromDate,
      toDate:toDate,
      typeOfLeave:typeOfLeave,
      description:description,
    }

    axios.post("http://localhost:8000/employeePost/addEmployee/post",data).then((res) => {
      this.setState({
        empID: "",
        empName: "",
        empEmail: "",
        empMobileNo: "",
        empPost: "",
        fromDate: "",
        toDate: "",
        typeOfLeave: "",
        description: "",
      })
    })
  }

render() {
  return (

    <div>
      <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Create Leave</h2>
      
    
      <div id="Employeerectangle">*
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
           <td> <label>Email : </label></td>
          <td><input type='email' className='form-inputEmployee' name='empEmail' value={this.state.empEmail} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder='employee@gmail.com'/></td>
          </tr>

          <tr>
           <td> <label>Mobile No : </label></td>
          <td><input type='tel' className='form-inputEmployee' name='empMobileNo' value={this.state.empMobileNo} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder="0??????????"    /></td>
          </tr>

          <tr>
            <td><label> post: </label></td>
            <select className='form-select' name='empPost' value={this.state.empPost} onChange={this.haddleInputChanges} style={{width:"240%", marginTop:"20px"}}  >
              <option>Select One</option>
              <option>Delivery drivers</option>
              <option>Secuirity officer</option>
              <option>Inventory keepers</option>
              <option>Cleaner</option>
              
            </select></tr>
            <tr>
            <td><label>From date:</label></td>
            <td> <input type='date' className='form-input' name='fromDate' value={this.state.fromDate} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder=''/></td>
            </tr>
            <tr>
            <td><label>To date:</label></td>
            <td> <input type='date' className='form-input' name='toDate' value={this.state.toDate} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder=''/></td>
            </tr>

            <tr>
            <td><label> Type of Leave: </label></td>
            <select className='form-select' name='typeOfLeave' value={this.state.typeOfLeave} onChange={this.haddleInputChanges} style={{width:"240%", marginTop:"20px"}}  >
              <option>Select One</option>
              <option>Sick Leaves</option>
              <option>vacation time</option>
              <option>Personal days</option>
              
              
            </select></tr>
            <tr>
            <td><label> Description: </label></td>
            <td><input type='text' className='form-inputEmployee' name='description' value={this.state.description} onChange={this.haddleInputChanges} placeholder='Enter description'/></td>
          </tr>


            <a href='/employee/DisplayEmployeeLeaves'><button type='submit' className='btn btn-success' onClick={this.onSubmitDetails} style={{marginLeft:"200px", marginTop:"20px"}}>SUBMIT</button></a>
            
          </table>
          </div>
          
          <br></br>
      </div>
      <br/>
    </div>





  )
}
}

