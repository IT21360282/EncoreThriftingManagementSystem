import React, { Component } from 'react'
import axios from 'axios'
import '../Employee.css'
import 'jspdf-autotable'
import jsPDF from 'jspdf'

class DeleteEmployee extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:props.id
      
    }
    this.onSubmitDelete = this.onSubmitDelete.bind(this)
  }

  onSubmitDelete(){
    axios.delete(`http://localhost:8000/employeePost/employeedelete/delete/${this.state.id}`).then(res=>{
      console.log("Successfully Deleted")
     alert("deleted")
    }).catch((err)=>{
      console.error("error orccurred",err)
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.onSubmitDelete} >Delete</button>
      </div>
    )
  }
}

export default class extends Component{
  constructor(props){
    super(props)
    this.state ={
      currentMonth: null,
      employeeDetails: [],
      searchInput:""
    }
    this.search=this.search.bind(this)
    this.handlesearchInput=this.handlesearchInput.bind(this)
  }

  componentDidMount(){

    axios.get("http://localhost:8000/employeeGet/addEmployeeDetails/get").then(res =>{
      if(res.data.success){
        this.setState({
          employeeDetails:res.data.existingDetails
        })
      }
    })
  }




//pdf
  generatePDF() {
    const tableemployee = document.getElementById("empDetailsTable")
    const {height,width} = tableemployee.getBoundingClientRect()
    const pdf = new jsPDF()
  
    pdf.text("Encore Stock Management",50,25)
  
    const columns = [];
    for(let i=0; i<6;i++){
      columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
    }
  
    const scaleFactor = pdf.internal.pageSize.width/width
  
    pdf.autoTable(
      {
        html: '#empDetailsTable',
        startY: 50,
        theme: 'grid',
        margin: { left:25,top: 20, bottom: 20, },
        tableWidth:  900* scaleFactor,
        
        columnStyles: { 0: {fontStyles: 'bold'},


        },
        scaleFactor:scaleFactor,
        columns
      })
  
      pdf.setFontSize("16")
      pdf.setTextColor("#00baa1")
      pdf.text("Employee Details Table",50,35)
      pdf.save("Employee.pdf")
    }

//search
  search(){

    axios.get("http://localhost:8000/employeeGet/employeeDetails/search?q=${this.state.searchInput}").then(res =>{
      if(res.data.success){
        this.setState({
          employeeDetails:res.data.searchedDetails
        })
      }
    })
  }

  handlesearchInput = (e) => {
    const searchInput = e.target.value
    this.setState({searchInput},() => {
      this.search()
    })
   }

  render() {
    //employeeDetails = this.state.employeeDetails
    return (
      <div>
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Available Employees </h2>
          <div><button className='searchEmployee'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchEmployee' value={this.state.searchInput} onChange={this.handlesearchInput} placeholder='Search Details Here'></input></div>
          <br/>
          <div className='table-employee'>
            <table className='table-employee' id="empDetailsTable" >
              <thead>
                <tr>
                  <th scope="col" className='table-employee' style={{borderTopLeftRadius:"10px"}}>Employee ID</th>
                  <th scope="col" className='table-employee'>Employee Name</th>
                  <th scope="col" className='table-employee'>Employee NIC</th>
                  <th scope="col" className='table-employee'>Employee Email</th>
                  <th scope="col" className='table-employee'>Employee Mobile</th>
                  <th scope="col" className='table-employee'>Post</th>
                  <th scope="col" className='table-employee' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
                </tr>
              </thead>
              <tbody scope="raw" >      
              {this.state.employeeDetails.map((results)=>(
                <tr>
                  <td className='table-employee'>{results.empID}</td>
                  <td className='table-employee'title={results.empName}>{results.empName}</td>
                  <td className='table-employee'title={results.empNIC}>{results.empNIC}</td>
                  <td className='table-employee'title={results.empEmail}>{results.empEmail}</td>
                  <td className='table-employee'title={results.empMobileNo}>{results.empMobileNo}</td>
                  <td className='table-employee'title={results.empPost}>{results.empPost}</td>
                  <td className='table-employee' style={{padding:"5px",border:"none"}}>
                    <div className='btn-inline-table'>
                    <a href={`/employee/update-employee/${results._id}`}><button type="button" className="btn btn-warning">UPDATE</button></a>
                    <DeleteEmployee id={results._id}/>
                    <a href='/employee/MoreDetailsEmployee'><button type="button" className="btn btn-primary">MORE</button></a>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
            <br></br>
            <center>
            <button className='btn btn-primary' onClick={this.generatePDF} type='primary'>Download</button>
            <a href='/employee-home'><button type='submit' className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>
            </center>
            <br></br>
        </div>

        







      </div> 
        
    )
  }
}
