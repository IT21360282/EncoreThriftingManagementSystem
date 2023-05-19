import React, { Component } from 'react'
import axios from 'axios'
import '../supplier.css'

export default class AddNewSupplier extends Component{
  constructor(props){
    super(props)
    this.state = {
      supName: "",
      supMobileNo: "",
      supEmail: "",
      supType: "",
      supTime: "",
    }
    this.onSubmitDetails=this.onSubmitDetails.bind(this)
    this.haddleInputChanges=this.haddleInputChanges.bind(this)
  }

  haddleInputChanges = (event) => {
    const {name,value} = event.target
    this.setState({
      ...this.setState, [name]:value
    })
    
  }

  haddleInputNumberChanges = (event) => {
    const { name, value } = event.target
    let errorMsg = ""
    const mobileRegex = /^[0][0-9]{9}$/ // Regex for Sri Lankan mobile numbers starting with 0 and with 10 digits

    // Check if mobile number input matches the desired pattern
    if (name === "supMobileNo" && !mobileRegex.test(value)) {
      errorMsg = "Invalid mobile number format. Please enter a valid number starting with 0 and with 10 digits."
    }

    this.setState({
      ...this.setState,
      [name]: value,
      errorMsg: errorMsg
    })
}

  onSubmitDetails(){

    const { supName, supEmail, supMobileNo, supType, supTime} = this.state

    const data = {
      
      supName:supName,
      supMobileNo:supMobileNo,
      supEmail:supEmail,
      supType:supType,
      supTime:supTime,
    }

    axios.post("http://localhost:8000/supplierPost/supplieravailable/post",data).then((res) => {
      this.setState({
        supName: "",
        supMobileNo: "",
        supEmail: "",
        supType: "",
        supTime: "",
      })
    })
  }

  render() {
    return (

      <div>
        <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Add a New Supplier</h2>
        
      
        <div id="Supplierrectangle">
        <div className='inline-formsSupplier'>
            
            <br></br><br></br>
            <table>

            <tr>
              <td><label>Supplier Name : </label></td>
              <td><input type='text' className='form-inputSupplier' style={{marginTop:"20px"}} name='supName' value={this.state.supName} onChange={this.haddleInputChanges} placeholder='Enter Supplier Name'/></td>
            </tr>

            <tr>
             <td> <label>Mobile No : </label></td>
             <td><input type='tel' className='form-inputSupplier' style={{ marginTop:"20px"}} placeholder="0??????????" name='supMobileNo' value={this.state.supMobileNo} onChange={this.haddleInputNumberChanges} /*type='tel' className='form-inputSupplier' style={{ marginTop:"20px"}} placeholder="0??????????"  name='supMobileNo' value={this.state.supMobileNo} onChange={this.haddleInputChanges}*/ />{this.state.errorMsg && <p className="error-msg">{this.state.errorMsg}</p>}</td>


             </tr>

            <tr>
             <td> <label>Email : </label></td>
            <td><input type='email' className='form-inputSupplier' name='supEmail' style={{ marginTop:"20px"}} value={this.state.supEmail} onChange={this.haddleInputChanges} placeholder='supplier@gmail.com'/></td>
            </tr>

             <tr>
              <td><label>Item Type : </label></td>
              <select className='form-select' style={{width:"240%", marginTop:"20px"}} name='supType' value={this.state.supType} onChange={this.haddleInputChanges} >
                <option>Select One</option>
                <option>Book</option>
                <option>Furniture</option>
                <option>Bag</option>
                <option>Cloths</option>
                <option>Electronic</option>
                <option>Electrical</option>
              </select></tr>

              <a href='/supplier/DisplayAllSuppliers'><button type='submit' className='btn btn-success' onClick={this.onSubmitDetails} style={{marginLeft:"200px", marginTop:"20px"}}>ADD</button></a>
              
            </table>
            </div>
            
            <br></br>
        </div>
        <br/>
      </div>





    )
  }
}

