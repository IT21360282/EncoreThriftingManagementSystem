import React, {Component} from 'react'
import '../financial.css'
import axios from 'axios'
import ReactModal from 'react-modal'


export default class extends Component{

  constructor(props){
    super(props)
    this.state={
        BankNo:"",
        BankName:"",
        BranchName:"",
        AccountNo:"",
        SWIFT:"",
        AccountCurr:"",
        AccountType:"",
        errmsg:"",
        isOpen:false
    }
    
    
    this.onSubmit=this.onSubmit.bind(this)
    this.handlePopUp=this.handlePopUp.bind(this)
}

  handleinput = (event) => {
    const {name,value}=event.target
    this.setState({
       ...this.state,[name]:value
    })
}

onSubmit(){
  const {BankNo,BankName,BranchName,AccountNo,SWIFT,AccountCurr,AccountType}=this.state
  const bank={
    B_No:BankNo,B_Name:BankName,Br_Name:BranchName,Acc_No:AccountNo,SWIFT:SWIFT,Acc_Cur:AccountCurr,Acc_Type:AccountType
  }
  axios.post("http://localhost:8000/financePost/bankshow/post",bank).then((response)=>{
    console.log("success")
    this.setState({errmsg:"Added Successfully!"})
  }).catch(error=>{
     console.error("Error Occured:",error)
     this.setState({errmsg:"Something is Wrong! Try Again"})
  })

}

handlePopUp(){
 
  this.setState({isOpen:!this.state.isOpen})
}



render(){
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Add Bank Details</h2>
                <br></br>
                
                    
        <div id="bankrectangle">
        <div className='bank-form'>
            
            <br></br><br></br>
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

            <a onClick={this.handlePopUp}><button onClick={this.onSubmit} className='btn btn-success'>ADD</button></a>
              
            </table>
            </div>
            
            <br></br>
        </div>
        <ReactModal isOpen={this.state.isOpen} style={{content:{height:"20%", width:"50%", borderRadius:"10px", position:"fixed",border:"3px solid #ff5520"}}}>
          {this.state.errmsg}<br/>
          <button className='btn btn-primary' onClick={this.handlePopUp}>Ok</button>
        </ReactModal>
      </div>
     )
        }
}