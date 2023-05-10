
import React, { Component } from 'react'
import axios from 'axios'
import '../financial.css'
import 'jspdf-autotable'
import jsPDF from 'jspdf'

class DeleteBank extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.id,
    }
    this.onSubmit=this.onSubmit.bind(this)
  }

  onSubmit(){
    axios.delete(`http://localhost:8000/financeDelete/financebank/delete/${this.state.id}`).then(res =>{
      console.log("Deleted")
    })
  }

  render() {
    return (
      <div>
        <a href="/financial/ViewBankDetails"><button onClick={this.onSubmit} type="button" className="btn btn-danger">Delete</button></a>
      </div>
    )
  }
}


export default class ViewBankDetails extends Component{
  constructor(props){
    super(props)
    this.state ={
      FinanceBankDetails: [],
      searchInput:""
    }
    this.search=this.search.bind(this)
    this.handleFindInput=this.handleFindInput.bind(this)
  }

  generatePDF() {
    const tablebank = document.getElementById("allbankdetails")
    const {height,width} = tablebank.getBoundingClientRect()
    const pdf = new jsPDF()
  
    pdf.text("Encore Stock Management",70,25)
  
    const columns = [];
    for(let i=0; i<6;i++){
      columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
    }
  
    const scaleFactor = pdf.internal.pageSize.width/width
  
    pdf.autoTable(
      {
        html: '#allbankdetails',
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
      pdf.text("Bank Details Sheet",78,35)
      pdf.save("Bank.pdf")
    }

  componentDidMount(){

    axios.get("http://localhost:8000/financeGet/bankshow/get").then(res =>{
      if(res.data.success){
        this.setState({
          FinanceBankDetails:res.data.existingDetails
        })
      }
    })
  }

  handleFindInput = (e) => {
    const searchInput = e.target.value
    this.setState({searchInput},() => {
      this.search()
    })
   }

  search(){
    axios.get(`http://localhost:8000/financeGet/bankdetails/search?q=${this.state.searchInput}`).then(res => {
        if(res.data.success){
            this.setState({
              FinanceBankDetails: res.data.searchedDetails
            })
        }
        
    })
    
}
  

  render() {
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>All Bank Details</h2>
          <div><button style={{marginLeft:"20px"}}className='searchBank'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchBank' value={this.state.searchInput} onChange={this.handleFindInput} placeholder='Search bank'></input></div>
          <br/>
          <div className='table-bank'>
          <table className='details-table' id='allbankdetails' >
            <thead>
              <tr>
                <th scope="col"  style={{borderTopLeftRadius:"10px"}}>Bank No</th>
                <th scope="col" >Bank Name</th>
                <th scope="col" >Branch Name</th>
                <th scope="col" >Account No</th>
                <th scope="col" >SWIFT</th>
                <th scope="col" >Account Currency</th>
                <th scope="col" >Account Type</th>
                
                <th scope="col" style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.FinanceBankDetails.map((results,index)=>(
              <tr>
                <td >B00{index+1}</td>
                <td title={results.B_Name}>{results.B_Name}</td>
                <td title={results.Br_Name}>{results.Br_Name}</td>
                <td title={results.Acc_No}>{results.Acc_No}</td>
                <td title={results.SWIFT}>{results.SWIFT}</td>
                <td title={results.Acc_Cur}>{results.Acc_Cur}</td>
                <td title={results.Acc_Type}>{results.Acc_Type}</td>
                
                <td style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                  <a href={`/financial/UpdateBankDetails/${results._id}`}><button type="button" className="btn btn-warning">Update</button></a>
                    <DeleteBank id={results._id}/>
                   </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          <button  style={{marginLeft:"450px",marginTop:"25px"}} className='btn btn-primary' onClick={this.generatePDF} type='primary'>Download PDF</button>
        </div>
      )
    }
}