import React, { Component } from 'react'
import '../Employee.css'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default function MoreDetailsEmployee() {
  const {id} = useParams()
  return (
      <div>
          <MoreDetailsEmployeeBody id = {id}/>
      </div>
  )
}

class MoreDetailsEmployeeBody extends Component {
  constructor(props) {
      super(props)
      this.state = {
          id: props.id,
          empID: "",
          empName: "",
          empMobileNo: "",
          empEmail: "",
          empPost: "",
          empNIC: "",
      }
  }

  componentDidMount(){
    axios.get(`http://localhost:8000/employeeGet/updateEmployeeDetails/get/${this.state.id}`).then(res => {
        if(res.data.success){
            this.setState({
                employeeDetails: res.data.existingDetails,
                empID: res.data.existingDetails.empID,
                empName: res.data.existingDetails.empName,
                empMobileNo: res.data.existingDetails.empMobileNo,
                empEmail: res.data.existingDetails.empEmail,
                empPost: res.data.existingDetails.empPost,
                empNIC: res.data.existingDetails.empNIC,
            })
        }
    }).catch((err) => {
        console.error("error: ",err)
    })
}

  render() {
    return (
        <div>
            
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Employee Details</h2>
            <br/>
            <div id="MoreEmployeerectangle">
            <center>
                <div id="EmployeeImagerectangle">

                </div>

                <hr></hr>
                <br/>
                <label>Employee  ID : {this.state.empID} </label>
                <br/><br/>
                <label>Employee Name : {this.state.empName}</label>
                <br/><br/>
                <label>Contact No : {this.state.empMobileNo}</label>
                <br/><br/>
                <label>E-mail Acc : {this.state.empEmail}</label>
                <br/><br/>
                <label>Designation : {this.state.empPost}</label>
                <br/><br/>
                <label>Employee NIC : {this.state.empNIC}</label>
                <br/>
                <a href='/employee/DisplayAllEmployeeDetails'><button type='submit' className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>

            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}