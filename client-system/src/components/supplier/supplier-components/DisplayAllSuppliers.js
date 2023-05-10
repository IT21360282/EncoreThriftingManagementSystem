import React, { Component } from 'react'
import axios from 'axios'
import '../supplier.css'
import 'jspdf-autotable'
import jsPDF from 'jspdf'

class DeleteSupplier extends Component {
  constructor(props){
    super(props)
    this.state = {
      id:props.id
    }
    this.onSubmitDelete = this.onSubmitDelete.bind(this)
  }

  onSubmitDelete(){
    axios.delete(`http://localhost:8000/supplierPost/supplierdelete/delete/${this.state.id}`).then(res=>{
      console.log("Successfully Deleted")
     alert("deleted")
    }).catch((err)=>{
      console.error("error orccurred",err)
    })
  }
  
  render() {
    return (
      <div>
        <a href='/supplier/DisplayAllSuppliers'><button className="btn btn-danger" onClick={this.onSubmitDelete} >Delete</button></a>
      </div>
    )
  }
}



export default class extends Component{
  constructor(props){
    super(props)
    this.state ={
      currentMonth: null,
      supplierDetails: [],
      searchInput:""
    }
    this.search=this.search.bind(this)
    this.handlesearchInput=this.handlesearchInput.bind(this)
  }

  generatePDF() {
    const tablesupplier = document.getElementById("supplierDetailsTable")
    const {height,width} = tablesupplier.getBoundingClientRect()
    const pdf = new jsPDF()
    
    pdf.setFontSize("20")
    pdf.text("Encore Stock Management",65,25)
  
    const columns = [];
    for(let i=0; i<5;i++){
      columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
    }
  
    const scaleFactor = pdf.internal.pageSize.width/width
  
    pdf.autoTable(
      {
        html: '#supplierDetailsTable',
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
      pdf.text("Supplier Details Table",74,35)
      pdf.save("Supplier.pdf")
    }

  componentDidMount(){

    axios.get("http://localhost:8000/supplierGet/supplieravailable/get").then(res =>{
      if(res.data.success){
        this.setState({
          supplierDetails:res.data.existingDetails
        })
      }
    })
  }

  search(){
    axios.get(`http://localhost:8000/supplierGet/supplierdetails/search?q=${this.state.searchInput}`).then(res => {
        if(res.data.success){
            this.setState({
              supplierDetails: res.data.searchedDetails
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
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Available Suppliers</h2>

          <div style={{marginLeft:"500px",width:"50%"}} >
            <button className='searchSupplier'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchSupplier' value={this.state.searchInput} onChange={this.handlesearchInput} placeholder='Search Details Here'></input>
            </div>
            <br/>
          <div className='table-supplier'>
          <table className='content-tablesupplier' id='supplierDetailsTable' >
            <thead className='content-table thead tr'>
              <tr className='content-table tbody tr'>
                <th className='content-table th' scope="col"  style={{borderTopLeftRadius:"7px"}}>Supplier ID</th>
                <th className='content-table th' scope="col" >Supplier Name</th>
                <th className='content-table th' scope="col" >Supplier Mobile</th>
                <th className='content-table th' scope="col" >Supplier Email</th>
                <th className='content-table th' scope="col" >Supplier Type</th>
                <th className='content-table th' scope="col" style={{border:"none",borderTopRightRadius:"7px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.supplierDetails.map((results,index)=>(
              <tr className='content-table tbody tr'>
                <td className='content-table td'>S00{index+1}</td>
                <td className='content-table td' title={results.supName}>{results.supName}</td>
                <td className='content-table td' title={results.supMobileNo}>{results.supMobileNo}</td>
                <td className='content-table td' title={results.supEmail}>{results.supEmail}</td>
                <td classname='content-table td' title={results.supType}>{results.supType}</td>
                <td className='content-table td' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                  <a href={`/supplier/UpdateSupplier/${results._id}`}><button type="button" className="btn btn-warning">UPDATE</button></a>
                  <DeleteSupplier id={results._id}/>
                  <a href={`/supplier/MoreDetailsSupplier/${results._id}`}><button type="button" className="btn btn-primary">MORE</button></a>
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
          <a href='/supplier/supplier-home'><button type='submit' className='btn btn-warning' style={{ marginLeft:"20px",marginTop:"20px"}}>BACK</button></a>
          </center>
          <br></br>
        </div>
    )
  }
}




