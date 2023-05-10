import React, { Component } from 'react'
import axios from 'axios'
import '../supplier.css'
import 'jspdf-autotable'
import jsPDF from 'jspdf'


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


generatePDF() {
  const tablesupplier = document.getElementById("bestsupplierDetailsTable")
  const {height,width} = tablesupplier.getBoundingClientRect()
  const pdf = new jsPDF()

  pdf.text("Encore Stock Management",70,25)

  const columns = [];
  for(let i=0; i<6;i++){
    columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
  }

  const scaleFactor = pdf.internal.pageSize.width/width

  pdf.autoTable(
    {
      html: '#bestsupplierDetailsTable',
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
    pdf.text("Best Supplier Details Table",70,35)
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

  

  render() {
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Find Best Suppliers</h2>
          <div style={{width:"100%",marginLeft:"20px", marginRight:"20px"}} >
          <button className='searchSupplier'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchSupplier' value={this.state.searchInput} onChange={this.handlesearchInput} placeholder='Search Details Here'></input>
            </div>
            <br/>
          <div className='table-supplier'>
          <table className='content-tablesupplier' id='bestsupplierDetailsTable' >
            <thead className='content-table thead tr'>
              <tr className='content-table tbody tr'>
                <th  scope="col"  style={{borderTopLeftRadius:"10px"}}>Supplier ID</th>
                <th  scope="col" >Supplier Name</th>
                <th  scope="col" >Supplier Mobile</th>
                <th  scope="col" >Supplier Email</th>
                <th  scope="col" >Supplier Type</th>
                <th  scope="col" >Delivery Time</th>
                <th  scope="col" style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.supplierDetails.map((results,index)=>(
              <tr className='content-table tbody tr'>
                <td >{results.supID}</td>
                <td  title={results.supName}>{results.supName}</td>
                <td title={results.supMobileNo}>{results.supMobileNo}</td>
                <td  title={results.supEmail}>{results.supEmail}</td>
                <td  title={results.supType}>{results.supType}</td>
                <td  title={results.supTime}>{results.supTime}</td>
                <td  style={{padding:"5px",border:"none"}}>
                <div className='btn-inline-table'>
                 <a href='/supplier/ContactSupplier'><button type="button" style={{marginLeft:"50px"}} className="btn btn-warning">CONTACT</button></a>
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
