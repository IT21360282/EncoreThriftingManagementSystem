import React, { Component } from 'react'
import axios from 'axios'
import '../stock.css'


export default class sendEmailSupplier extends Component{
constructor(props){
  super(props)
  this.state={
     sender:'encorethriftinglk@gmail.com',
     inventoryReciver:'',
     inventorySubject:'',
     inventoryMsg:''
}
this.onSubmit=this.onSubmit.bind(this)

}   

handleinput = (e) => {
  const {name,value}=e.target
  this.setState({
      ...this.state,[name]:value
  })
}

onSubmit(){
  const {inventoryReciver,inventorySubject,inventoryMsg}=this.state
 const mail={
  inventoryReciver:inventoryReciver,
  inventorySubject:inventorySubject, 
  inventoryMsg:inventoryMsg
 } 

 axios.post("http://localhost:8000/sendEmailInventory/post",mail).then((response)=>{
  console.log("success")
  this.state({success:true})
}).catch(error=>{
   console.error("Error Occured:",error)
  })

  }

  render() {
    return (
        <div>
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Contact Supplier</h2>
            <br/>
            <div id="">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <br/>
            <input type='text' className='inputSupplieremail' name='sender' value={this.state.sender} readOnly/>
            <br/>
            <input type='text' className='inputSupplieremail' name='inventoryReciver' value={this.state.inventoryReciver} onChange={this.handleinput} placeholder='To'/>
            <br/>
            <input type='text' className='inputSupplieremail' name='inventorySubject' value={this.state.inventorySubject} onChange={this.handleinput} placeholder='Subject'/>
            <br/>
            <textarea  rows="15" cols="50" name='inventoryMsg' value={this.state.inventoryMsg} onChange={this.handleinput} placeholder='Message...' style={{marginLeft:'40px',border: '2px solid #ff5520',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <button type='submit' className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button>
            <button type='submit' onClick={this.onSubmit} className='btn btn-success' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button>
            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}