import React, {Component} from 'react'
import '../financial.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function UpdateBankDetails() {
  const id = useParams()
  return (
    <div>
      <UpdateBankDetailsBody id={id}/>
    </div>
  )
}


class UpdateBankDetailsBody extends Component{
    constructor(props){
      super(props)
      this.state = {
        id: props.id,
        BankNo: "",
        BankName:"",
        BranchName:"",
        AccountNo:"",
        SWIFT:"",
        AccountCurr:"",
        AccountType:"",
      }
    }

    componentDidMount(){
      axios.get(`http://localhost:8000/financeGet/bankshow/getSpec/${this.state.id}`).then(res =>{
      if(res.data.success){
        this.setState({
          BankNo:res.data.existingDetails.B_No,
          BankName:res.data.existingDetails.B_Name,
          BranchName:res.data.existingDetails.Br_Name,
          AccountNo:res.data.existingDetails.Acc_No,
          SWIFT:res.data.existingDetails.SWIFT,
          AccountCurr:res.data.existingDetails.Acc_Curr,
          AccountType:res.data.existingDetails.Acc_Type,
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
      const { BankNo,BankName,BranchName,AccountNo,SWIFT,AccountCurr,AccountType } = this.state
      const data = {
        B_No:BankNo,
        B_Name:BankName,
        Br_Name:BranchName,
        Acc_No:AccountNo,
        SWIFT:SWIFT,
        Acc_Curr:AccountCurr,
        Acc_Type:AccountType
      }
      axios.put(`http://localhost:8000/finance/otherbank/put/${this.state.id}`,data).then((response)=>{
        console.log("success updated")
        
      }).catch(error=>{
         console.error("Error:",error)
      })
    }

    render(){
        return (
            <div>
              <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Update Bank Details</h2>      
              <div id="bankuprectangle">
                <div className='bankup-form'>
                  <h3 style={{marginLeft:"20px",marginTop:"65px",color:"#ff5520",textAlign:'center'}}>Update Relevant Bank Details</h3>
                  <br></br>
                  <table>
                    <tr>
                    <td><label>Bank Number:</label></td>
                    <td><input type='text' className='form-input' name='BankNo' value={this.state.BankNo} onChange={this.handleinput} placeholder='Bank_No'/></td><br></br>
                    </tr>

                    <tr>
                    <td> <label>Bank Name:</label></td>
                    <td><input type='text' className='form-input' name='BankName' value={this.state.BankName} onChange={this.handleinput} placeholder='Bank_Name'/></td><br></br>
                    </tr>

                    <tr>
                    <td> <label>Branch Name:</label></td>
                    <td><input type='text' className='form-input' name='BranchName' value={this.state.BranchName} onChange={this.handleinput} placeholder='Branch_Name'/></td><br></br>
                    </tr>

                    <tr>
                    <td> <label>Account Number:</label></td>
                    <td><input type='text' className='form-input' name='AccountNo' value={this.state.AccountNo} onChange={this.handleinput} placeholder='xxxxxxx'/></td><br></br>
                    </tr>
                    
                    <tr>
                    <td> <label>SWIFT/BIC:</label></td>
                    <td><input type='text' className='form-input' name='SWIFT' value={this.state.SWIFT} onChange={this.handleinput} placeholder='SWIFT'/></td><br></br>
                    </tr>

                    <tr>
                      <td><label>Account Currency:</label></td>
                      <select className='form-select' name='AccountCurr' value={this.state.AccountCurr} onChange={this.handleinput} style={{width:"240%"}}>
                        <option>LKR</option>
                        <option>USD</option>
                        <option>EURO</option>
                        <option>GBP</option>
                        <option>AUD</option>
                        <option>INR</option>
                        <option>CNY</option>
                      </select></tr><br/>

                    <tr>
                      <td><label>Account Type:</label></td>
                      <select className='form-select' name='AccountType' value={this.state.AccountType} onChange={this.handleinput} style={{width:"240%"}}>
                        <option>Savings Account</option>
                        <option>Current Account</option>
                        <option>Cheque</option>
                        <option>Online Banking</option>
                        <option>Fixed Deposit Account</option>
                      </select></tr><br/>

                    <button onClick={this.onSubmit} className='btn btn-warning'>Update</button>
                      
                    </table>
                </div>
                <br></br>
              </div>
            </div>
        )
    }
}