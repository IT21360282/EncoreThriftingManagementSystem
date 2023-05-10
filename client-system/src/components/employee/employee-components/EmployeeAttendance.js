import React, { Component } from 'react'
import axios from 'axios'
import '../Employee.css'

export default class EmployeeLeave extends Component {
  constructor(props){
    super(props)
    this.state = {
      empID: "E001",
      empName: "",
      empPost: "",
      Date:"",
      shiftStartTime:"",
      shiftEndTime:"",
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

    const {empID, empName, empPost, Date,  shiftStartTime, shiftEndTime } = this.state

    const data = {
      empID:empID,
      empName:empName,
      empPost:empPost,
      Date:Date,
      shiftStartTime:shiftStartTime,
      shiftEndTime:shiftEndTime,
    }

    axios.post("http://localhost:8000/employeePost/addEmployee/post",data).then((res) => {
      this.setState({
        empID: "",
        empName: "",
        empPost: "",
        Date: "",
        shiftStartTime: "",
        shiftEndTime: "",
      })
    })
  }

render() {
  return (

    <div>
      <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Employee Attendance Form</h2>
      
    
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
            <td><label> Post: </label></td>
            <select className='form-select' name='empPost' value={this.state.empPost} onChange={this.haddleInputChanges} style={{width:"240%", marginTop:"20px"}}  >
              <option>Select One</option>
              <option>Delivery drivers</option>
              <option>Secuirity officer</option>
              <option>Inventory keepers</option>
              <option>Cleaner</option>
              
            </select></tr>
            <tr>
            <td><label> Date:</label></td>
            <td> <input type='date' className='form-input' name='Date' value={this.state.Date} onChange={this.haddleInputChanges} style={{ marginTop:"20px"}} placeholder=''/></td>
            </tr>
           
            <tr>
            <td><label> Shift start time: </label></td>
            <td><input type='text' className='form-inputEmployee' name='shiftStartTime' value={this.state.shiftStartTime} onChange={this.haddleInputChanges} placeholder='Enter shift start time'/></td>
          </tr>

          <tr>
          <td><label> Shift end time: </label></td>
          <td><input type='text' className='form-inputEmployee' name='shiftEndTime' value={this.state.shiftEndTime} onChange={this.haddleInputChanges} placeholder='Enter shift end time'/></td>
        </tr>


            <a href='/employee/DisplayEmployeeAttendence'><button type='submit' className='btn btn-success' onClick={this.onSubmitDetails} style={{marginLeft:"200px", marginTop:"20px"}}>SUBMIT</button></a>
            
          </table>
          </div>
          
          <br></br>
      </div>
      <br/>
    </div>





  )
}
}

