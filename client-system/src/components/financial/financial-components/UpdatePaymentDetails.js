import React, {Component} from 'react'
import '../financial.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function UpdatePaymentDetails(){

  const {id} = useParams()
  return (
    <div>
      <UpdatePaymentDetailsBody id={id}/>
    </div>
  )
}


class UpdatePaymentDetailsBody extends Component{
    constructor(props){
      super(props)
      this.state = {
        id: props.id,
        PaymentID: "",
        FullName:"",
        PaymentType:"",
        Amount:"",
        PaymentDate:"",
        CardNumber:"",
        ExpiredYear:"",
        CVC:"",
      }
      this.handleinput = this.handleinput.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
      axios.get(`http://localhost:8000/financeGet/financeshow/getSpec/${this.state.id}`).then(res =>{
      if(res.data.success){
        this.setState({
          PaymentID:res.data.existingDetails.paymentID,
          FullName:res.data.existingDetails.FullName,
          PaymentType:res.data.existingDetails.Pay_Type,
          Amount:res.data.existingDetails.Amount,
          PaymentDate:res.data.existingDetails.Pay_Date,
          CardNumber:res.data.existingDetails.Card_Number,
          ExpiredYear:res.data.existingDetails.Expired_Year,
          CVC:res.data.existingDetails.CVC,
        })
      }
    })
    }

    handleinput = (e) =>{
      const {value,name} = e.target
      this.setState({
        ...this.state, [name]:value
      })
    }

    onSubmit(){
      const { PaymentID,FullName,PaymentType,Amount,PaymentDate,CardNumber,ExpiredYear,CVC} = this.state
      const data = {
        paymentID:PaymentID,
        FullName:FullName,
        Pay_Type:PaymentType,
        Amount:Amount,
        Pay_Date:PaymentDate,
        Card_Number:CardNumber,
        Expired_Year:ExpiredYear,
        CVC: CVC,
      }
      
      axios.put(`http://localhost:8000/financePut/otherfinance/put/${this.state.id}`,data).then((response)=>{
        console.log("success updated")
        
      }).catch(error=>{
         console.error("Error:",error)
      })
  
    }

    render(){
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Update Payment Details</h2>
                
                
                    
                    {this.state.id}
        <div id="payuprectangle">
        <div className='payup-form'>
        <h3 style={{marginLeft:"20px",marginTop:"65px",color:"#ff5520",textAlign:'center'}}>Update Relevant Payment Details</h3>
            <br></br>
            <table>
            <tr>
            <td><label>Payment ID:</label></td>
            <td><input type='text' className='form-input' name='PaymentID' value={this.state.PaymentID} onChange={this.handleinput} placeholder='Payment_ID'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Full Name:</label></td>
            <td><input type='text' className='form-input' name='FullName' value={this.state.FullName} onChange={this.handleinput} placeholder='Full_Name'/></td><br></br>
            </tr>

              <tr>
              <td><label>Payment Type:</label></td>
              <select className='form-select' name='PaymentType' value={this.state.PaymentType} onChange={this.handleinput} style={{width:"240%"}}>
                <option>Credit card</option>
                <option>Debit card</option>
                <option>Visa card</option>
                <option>American Express</option>
              </select></tr><br/>

               <tr>
              <td><label>Amount:</label></td>
              <td><input type='text' className='form-input' name='Amount' value={this.state.Amount} onChange={this.handleinput} placeholder='Amount'/></td><br></br>
              </tr>

              <tr>
              <td><label>Payment date:</label></td>
              <td><input type='date' className='form-input' name='PaymentDate' value={this.state.PaymentDate} onChange={this.handleinput} placeholder=''/></td>
              </tr>

              <tr>
              <td><label>Card Number:</label></td>
              <td><input type='text' className='form-input' name='CardNumber' value={this.state.CardNumber} onChange={this.handleinput} placeholder='1111-2222-3333-4444'/></td><br></br>
              </tr>

               <tr>
              <td><label>Expired Year:</label></td>
              <td><select className='form-select' name='ExpiredYear' value={this.state.ExpiredYear} onChange={this.handleinput}  style={{width:"240%"}}>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select></td></tr><br/>

             <tr>
             <td> <label>CVC:</label></td>
              <td><input type='text' className='form-input' name='CVC' value={this.state.CVC} onChange={this.handleinput} placeholder='CVV'/></td><br></br>
              </tr>
              <br></br>
             <button onClick={this.onSubmit} className='btn btn-warning'>Update</button>
              
            </table>
            </div>
            
            <br></br>
             </div>
      </div>
     )
   }
}