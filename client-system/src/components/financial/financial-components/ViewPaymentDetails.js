import React, { Component } from 'react'
import axios from 'axios'
import '../financial.css'
import 'jspdf-autotable'
import jsPDF from 'jspdf'

class DeletePayment extends Component{
  constructor(props){
    super(props)
    this.state={
      id: props.id,
    }
    
  }

onSubmit(){
  axios.delete(`http://localhost:8000/financeDelete/financepayment/delete/${this.state.id}`).then(res =>{
    console.log("Deleted")
  })
}
render(){
  return (
    <div>
      <a href="/financial/ViewPaymentDetails"><button onClick={this.onSubmit} type="button" className="btn btn-danger">Delete</button></a>
    </div>
  )
}

}

export default class  extends Component{
  constructor(props){
    super(props)
    this.state ={
      FinancePaymentDetails: [],
      searchInput:""
    }
    this.search=this.search.bind(this)
    this.handleFindInput=this.handleFindInput.bind(this)
  }

  generatePDF() {
    const tablepayment = document.getElementById("allpaymentdetails")
    const {height,width} = tablepayment.getBoundingClientRect()
    const pdf = new jsPDF()
  
    pdf.text("Encore Stock Management",70,25)
  
    const columns = [];
    for(let i=0; i<6;i++){
      columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
    }
  
    const scaleFactor = pdf.internal.pageSize.width/width
  
    pdf.autoTable(
      {
        html: '#allpaymentdetails',
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
      pdf.text("Payment Details Sheet",76,35)
      pdf.save("Payment.pdf")
    }


  componentDidMount(){

    axios.get("http://localhost:8000/financeGet/financeshow/get").then(res =>{
      if(res.data.success){
        this.setState({
          FinancePaymentDetails:res.data.existingDetails
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
    axios.get(`http://localhost:8000/financeGet/paymentdetails/search?q=${this.state.searchInput}`).then(res => {
        if(res.data.success){
            this.setState({
                FinancePaymentDetails: res.data.searchedDetails
            })
        }
        
    })
    
}

  render() {
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>All Payment Details</h2>
          <div><button style={{marginLeft:"20px"}}className='searchPayments'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchPayments' value={this.state.searchInput} onChange={this.handleFindInput} placeholder='Search payments'></input></div>
          <br/>
          <div className='table-finance'>
          <table className='table-finance' id='allpaymentdetails' >
            <thead>
              <tr>
                <th scope="col" className='table-finance' style={{borderTopLeftRadius:"10px"}}>Payment ID</th>
                <th scope="col" className='table-finance'>Full Name</th>
                <th scope="col" className='table-finance'>Payment Type</th>
                <th scope="col" className='table-finance'>Amount</th>
                <th scope="col" className='table-finance'>Payment Date</th>
                <th scope="col" className='table-finance'>Card Number</th>
                <th scope="col" className='table-finance'>Expired Year</th>
                <th scope="col" className='table-finance'>CVC</th>
                <th scope="col" className='table-finance' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.FinancePaymentDetails.map((results,index)=>(
              <tr>
                <td className='table-finance'>B00{index+1}</td>
                <td className='table-finance'title={results.FullName}>{results.FullName}</td>
                <td className='table-finance'title={results.Pay_Type}>{results.Pay_Type}</td>
                <td className='table-finance'title={results.Amount}>{results.Amount}</td>
                <td className='table-finance'title={results.Pay_Date}>{results.Pay_Date}</td>
                <td className='table-finance'title={results.Card_Number}>{results.Card_Number}</td>
                <td className='table-finance'title={results.Expired_Year}>{results.Expired_Year}</td>
                <td className='table-finance'title={results.CVC}>{results.CVC}</td>
                <td className='table-finance' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                  <a href={`/financial/UpdatePaymentDetails/${results._id}`}><button type="button" className="btn btn-warning">Update</button></a>
                    <button onClick={this.onSubmit} type="button" className="btn btn-danger">Delete</button>
                    
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