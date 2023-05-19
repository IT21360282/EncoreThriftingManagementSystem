import React, {Component} from 'react'
import '../financial.css'
import ReactModal from 'react-modal'
import axios from 'axios'

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

export default class extends Component{

    constructor(props){
        super(props)
        this.state = {
            checkbox1:false,
            checkbox2:false,
            FinanceBankDetails:[],
            FinancePaymentDetails:[],
            isOpenPayment:false,
            isOpenBank:false
        }
        this.handlePopUpPayment = this.handlePopUpPayment.bind(this)
        this.handlePopUpBank = this.handlePopUpBank.bind(this)
    }

    componentDidMount(){

        axios.get("http://localhost:8000/financeGet/bankshow/get").then(res =>{
          if(res.data.success){
            this.setState({
              FinanceBankDetails:res.data.existingDetails
            })
          }
        })

        axios.get("http://localhost:8000/financeGet/financeshow/get").then(res =>{
      if(res.data.success){
        this.setState({
          FinancePaymentDetails:res.data.existingDetails
        })
      }
    })
      }

      handlePopUpPayment(){
        this.setState({isOpenPayment:!this.state.isOpenPayment})
      }
      handlePopUpBank(){
        this.setState({isOpenBank:!this.state.isOpenBank})
      }

    handleCheckBoxChange = (e) => {
        const {name,checked} = e.target
        this.setState({[name]:checked},()=>{
            this.getData()
        })
       
    }

    render(){
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Financial Report Generate</h2>
                <br></br>
                
                    
        <div id="freprectangle">
      
            <div className='frep-form'><br></br>
            <h3 style={{marginLeft:"20px",marginTop:"10px",color:"#ff5520",textAlign:'center'}}>Select the relevant detail to be include in the month-end report</h3>
            <br></br>

        <div style={{marginLeft:"auto", marginRight:"auto", width:"60%"}}>
            <table>
            <tr>
            <td style={{textAlign:"left"}}><label>Include All the Bank Details:</label></td>
          
            <button className='btn btn-success' onClick={this.handlePopUpBank}>Generate</button>
            </tr>
            <br></br>
            

            <tr>
             <td> <label>Include All the Payment Details:</label></td>
            
             <button className='btn btn-success' onClick={this.handlePopUpPayment}>Generate</button>
            </tr><br></br>


        
            
            </table> <br></br>
            </div>
            

              </div>
             <br></br>
        </div>
        <ReactModal isOpen={this.state.isOpenPayment} onRequestClose={this.handlePopUpPayment} className="popUp90 zoom-in" style={{content:{width:"70%"}}}> 
          <div style={{marginTop:"10px", marginBottom:"10px", textAlign:"center"}}>
            <h2>All Finalized Payment Details</h2>
          </div>
          <div className='div-frame'>
          <table className='details-table' >
          <thead>
              <tr>
                <th scope="col"  style={{borderTopLeftRadius:"10px"}}>Payment ID</th>
                <th scope="col" >Full Name</th>
                <th scope="col" >Payment Type</th>
                <th scope="col" >Amount</th>
                <th scope="col" >Payment Date</th>
                <th scope="col" >Card Number</th>
                <th scope="col" >Expired Year</th>
                <th scope="col" >CVC</th>
                <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.FinancePaymentDetails.map((results,index)=>(
              <tr>
                <td >B00{index+1}</td>
                <td title={results.FullName}>{results.FullName}</td>
                <td title={results.Pay_Type}>{results.Pay_Type}</td>
                <td title={results.Amount}>{results.Amount}</td>
                <td title={results.Pay_Date}>{results.Pay_Date}</td>
                <td title={results.Card_Number}>{results.Card_Number}</td>
                <td ctitle={results.Expired_Year}>{results.Expired_Year}</td>
                <td title={results.CVC}>{results.CVC}</td>
                <td  style={{padding:"5px",border:"none"}}>
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
          
            <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"8%"}}>
              <div className='btn-inline'>
                <button className='btn btn-primary' onClick={this.handlePopUpPayment}>Close</button>
              </div> 
            </div>
        </ReactModal>
        
        <ReactModal isOpen={this.state.isOpenBank} onRequestClose={this.handlePopUpBank} className="popUp90 zoom-in" style={{content:{width:"70%"}}}> 
          <div style={{marginTop:"10px", marginBottom:"10px", textAlign:"center"}}>
            <h2>All Finalized Bank Details</h2>
          </div>
          <div className='div-frame'>
          <table className='details-table' >
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
                
                <td className='table-bank' style={{padding:"5px",border:"none"}}>
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
          
            <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"8%"}}>
              <div className='btn-inline'>
                <button className='btn btn-primary' onClick={this.handlePopUpBank}>Close</button>
              </div> 
            </div>
        </ReactModal>
      </div>
     )
   }
}