
import React, { Component } from 'react'
import axios from 'axios'
import '../financial.css'

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
      FinanceBankDetails: []
    }
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
  

  render() {
    return (
        <div>
          <h2 style={{marginLeft:"20px",marginTop:"65px"}}>All Bank Details</h2>
          <div><button style={{marginLeft:"20px"}}className='searchBank'><i class="fa-solid fa-magnifying-glass"></i></button><input className='searchBank' placeholder='Search bank'></input></div>
          <br/>
          <div className='table-bank'>
          <table className='table-bank' >
            <thead>
              <tr>
                <th scope="col" className='table-bank' style={{borderTopLeftRadius:"10px"}}>Bank No</th>
                <th scope="col" className='table-bank'>Bank Name</th>
                <th scope="col" className='table-bank'>Branch Name</th>
                <th scope="col" className='table-bank'>Account No</th>
                <th scope="col" className='table-bank'>SWIFT</th>
                <th scope="col" className='table-bank'>Account Currency</th>
                <th scope="col" className='table-bank'>Account Type</th>
                
                <th scope="col" className='table-bank' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.FinanceBankDetails.map((results,index)=>(
              <tr>
                <td className='table-bank'>{results.B_No}</td>
                <td className='table-bank'title={results.B_Name}>{results.B_Name}</td>
                <td className='table-bank'title={results.Br_Name}>{results.Br_Name}</td>
                <td className='table-bank'title={results.Acc_No}>{results.Acc_No}</td>
                <td className='table-bank'title={results.SWIFT}>{results.SWIFT}</td>
                <td className='table-bank'title={results.Acc_Cur}>{results.Acc_Cur}</td>
                <td className='table-bank'title={results.Acc_Type}>{results.Acc_Type}</td>
                
                <td className='table-bank' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                  <a href={`/financial/UpdateBankDetail/${results._id}`}><button type="button" className="btn btn-warning">Update</button></a>
                    <DeleteBank id={results._id}/>
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