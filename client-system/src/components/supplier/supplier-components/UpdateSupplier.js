import React, { Component } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import '../supplier.css'

export default function Updatesuppliers() {
  const {id} = useParams()
  return (
      <div>
          <UpdatesupplierBody id = {id}/>
      </div>
  )
}

class UpdatesupplierBody extends Component {
  constructor(props) {
      super(props)
      this.state = {
          id: props.id,
          supID: "",
          supName: "",
          supMobileNo: "",
          supEmail: "",
          supType: "",
          supTime: "",
      }
      this.handleInputValueChange = this.handleInputValueChange.bind(this)
      this.onSubmitUpdate = this.onSubmitUpdate.bind(this)
  }

  componentDidMount(){
    axios.get(`http://localhost:8000/supplierGet/updatesuppliers/get/${this.state.id}`).then(res => {
        if(res.data.success){
            this.setState({
                supplierDetails: res.data.existingDetails,
                supID: res.data.existingDetails.supID,
                supName: res.data.existingDetails.supName,
                supMobileNo: res.data.existingDetails.supMobileNo,
                supEmail: res.data.existingDetails.supEmail,
                supType: res.data.existingDetails.supType,
                supTime: res.data.existingDetails.supTime,
            })
        }
    }).catch((err) => {
        console.error("error: ",err)
    })
}


  handleInputValueChange = (e) => {
    const {value,name} = e.target
    this.setState({
        ...this.state, [name]:value
    })
  }

  onSubmitUpdate(){

    const {supName, supEmail, supMobileNo, supTime, supType} = this.state
    const data = {
      supName:supName,
      supEmail:supEmail,
      supMobileNo:supMobileNo,
      supTime:supTime,
      supType:supType
    }

    axios.put(`http://localhost:8000/supplierPut/updatesuppliers/put/${this.state.id}`,data).then((res) => {
      console.log("Successfully Updated")
    })
  }


  render() {
    return (

      <div>
        <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Update Supplier Details</h2>
        
      
        <div id="Supplierrectangle">
        <div className='inline-formsSupplier'>
            
            <br></br><br></br>
            <table>

            <tr>
              <td><label>Supplier Name : </label></td>
              <td><input type='text' className='form-inputSupplier' style={{marginTop:"20px"}} value={this.state.supName} onChange={this.handleInputValueChange} name='supName'   placeholder='Enter Supplier Name'/></td>
            </tr>

            <tr>
             <td> <label>Mobile No : </label></td>
            <td><input type='tel' className='form-inputSupplier' style={{marginTop:"20px"}} value={this.state.supMobileNo} onChange={this.handleInputValueChange} placeholder="0??????????"  name='supMobileNo'/></td>
            </tr>

            <tr>
             <td> <label>Email : </label></td>
            <td><input type='text' className='form-inputSupplier' style={{marginTop:"20px"}} value={this.state.supEmail} onChange={this.handleInputValueChange} name='supEmail' placeholder='supplier@gmail.com'/></td>
            </tr>

             <tr>
              <td><label>Item Type : </label></td>
              <select className='form-select' style={{width:"240%" , marginTop:"20px"}} value={this.state.supType} onChange={this.handleInputValueChange} name='supType' >
              <option>Select One</option>
                <option>Book</option>
                <option>Furniture</option>
                <option>Bag</option>
                <option>Cloths</option>
                <option>Electronic</option>
                <option>Electrical</option>
              </select></tr>

              <tr>
              <td><label>Delevery Time : </label></td>
              <select className='form-select' style={{width:"240%" , marginTop:"20px"}} value={this.state.supTime} onChange={this.handleInputValueChange} name='supTime' >
                <option>Select Time</option>
                <option>On Time</option>
                <option>Late 24 hours</option>
                <option>Late 48 hours</option>
                <option>Late 3 Days</option>
              </select></tr>

              <a href='/supplier/DisplayAllSuppliers'><button type='submit' onClick={this.onSubmitUpdate} className='btn btn-warning' style={{marginLeft:"200px", marginTop:"20px"}}>Update</button></a>
              
            </table>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
        <br/>
      </div>





    )
  }
}
