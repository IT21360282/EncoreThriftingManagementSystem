import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import  './employee.css'

export default class EmployeeHome extends Component {
  constructor(props){
    super(props)
    this.state ={
      currentMonth: null,
      addEmployeeDetails: []
    }
  }

  componentDidMount(){
    const nowTime = new Date()
    const month = nowTime.toLocaleString('default',{month:'short'})
    this.setState({currentMonth:month})

    axios.get("http://localhost:8000/employeeGet/addEmployeeDetails/get").then(res =>{
      if(res.data.success){
        this.setState({
          addEmployeeDetails:res.data.existingDetails
        })
      }
    })
  }

  componentDidMount(){
    this.fetchEmpCount();
  }

  fetchEmpCount = async() => {
    try {
      const response = await axios.get("http://localhost:8000/employeeGet/get/employee/count");
      this.setState({employeeCount: response.data.count})
    } catch (error) {
      console.error(error)
    }
  }


  render() {   
    
    
    const {currentDate} = this.state
    const totalEmployees = 45
    const avgDailyWorkingTime = 8
    const numOfAttendence= 50


    return (
      <div className='Employee'>
        <div >
          <div className='btn-inline' style={{marginTop:"140px"}} >
            <a href={`/employee/add-employee`}><button className='btn-inline'>Add Employee Details</button></a>
            <a href={`/employee/employee-attendance`}><button className='btn-inline'>Employee Attendance</button></a>
            <a href={`/employee/employee-leave`}><button className='btn-inline'>Employee Leave Management</button></a>
            
            
            
          </div>

          

          <div className='btn-inline'>
          
          <div style={{width:"99%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
            <div className='semi-preview-container'>Total number of employees<br/>{this.state.employeeCount}</div>
            <div className='semi-preview-container'>Daily average working time<br/>{avgDailyWorkingTime}</div>
            <div className='semi-preview-container'>Total number of attendence in today{currentDate}<br/>{numOfAttendence}</div>
            </div>
          
         
          </div>
          </div>
          </div>
          
          <div className='btn-inline' style={{marginTop:"30px",marginBottom:"30px"}}>
            <button className='btn-inline'>Generate Reports</button>
            <a href={`/employee/employee-mails`}><button className='btn-inline'>Send Emails</button></a>
            <button className='btn-inline'>Graph Generator</button>
            <button className='btn-inline' style={{width:"360px"}}>Data Analyzing and Calculating</button>
          </div>
        </div>
      </div>
    )
  }
}
