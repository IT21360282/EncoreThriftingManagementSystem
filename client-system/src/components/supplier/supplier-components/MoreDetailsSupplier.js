import React, { Component } from 'react'
import '../supplier.css'
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default function MoreDetailsSupplier() {
  const {id} = useParams()
  return (
      <div>
          <MoreDetailsSupplierBody id = {id}/>
      </div>
  )
}

class MoreDetailsSupplierBody extends Component {
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

  render() {
    return (
        <div>
            
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Supplier Details</h2>
            <br/>
            <div id="MoreSupplierrectangle">
            <center>
                <div id="SupplierImagerectangle">

                </div>

                <hr></hr>
                <br/>
                <label>Supplier  ID : {this.state.supID} </label>
                <br/><br/>
                <label>Supplier Name : {this.state.supName}</label>
                <br/><br/>
                <label>Contact No : {this.state.supMobileNo}</label>
                <br/><br/>
                <label>E-mail Acc : {this.state.supEmail}</label>
                <br/><br/>
                <label>Item  Type : {this.state.supType}</label>
                <br/><br/>
                <label>Delevery Time : {this.state.supTime}</label>
                <br/>
                <a href='/supplier/DisplayAllSuppliers'><button type='submit' className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>

            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}