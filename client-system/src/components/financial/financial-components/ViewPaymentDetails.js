import React, { Component } from 'react'
import axios from 'axios'
import '../financial.css'

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
      FinancePaymentDetails: []
    }
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

  render() {
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>All Payment Details</h2>
          <div><button style={{marginLeft:"20px"}}className='searchPayments'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchPayments' placeholder='Search payments'></input></div>
          <br/>
          <div className='table-finance'>
          <table className='table-finance' >
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
                <td className='table-finance'>{results.paymentID}</td>
                <td className='table-finance'title={results.FullName}>{results.FullName}</td>
                <td className='table-finance'title={results.Pay_Type}>{results.Pay_Type}</td>
                <td className='table-finance'title={results.Amount}>{results.Amount}</td>
                <td className='table-finance'title={results.Pay_Date}>{results.Pay_Date}</td>
                <td className='table-finance'title={results.Card_Number}>{results.Card_Number}</td>
                <td className='table-finance'title={results.Expired_Year}>{results.Expired_Year}</td>
                <td className='table-finance'title={results.CVC}>{results.CVC}</td>
                <td className='table-finance' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                  <a href='/financial/UpdatePaymentDetails'><button type="button" className="btn btn-warning">Update</button></a>
                  <DeletePayment id={results._id}/>
                   </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
      )
    }
}