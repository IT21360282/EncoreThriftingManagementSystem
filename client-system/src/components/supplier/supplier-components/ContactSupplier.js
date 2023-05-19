import React, { Component } from 'react'
import axios from 'axios'
import '../supplier.css'


export default class sendEmailSupplier extends Component{
constructor(props){
  super(props)
  this.state={
     sender:'encorethriftinglk@gmail.com',
     supreciever:'',
     supSubject:'',
     supmsg:''
}
this.onSubmit=this.onSubmit.bind(this)

}   

handleinput = (event) => {
  const {name,value}=event.target
  this.setState({
      ...this.state,[name]:value
  })
}

onSubmit(){
  const {supreciever,supSubject,supmsg}=this.state
 const mail={
  supreciever:supreciever,
  supSubject:supSubject, 
  supmsg:supmsg
 } 

 axios.post("http://localhost:8000/supplierPost/sendEmailSupplier",mail).then((response)=>{
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
            <div id="EmailSupplierrectangle">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <br/>
            <input type='text' className='inputSupplieremail' name='sender' value={this.state.sender} readOnly/>
            <br/>
            <input type='text' className='inputSupplieremail' name='supreciever' value={this.state.supreciever} onChange={this.handleinput} placeholder='To'/>
            <br/>
            <input type='text' className='inputSupplieremail' name='supSubject' value={this.state.supSubject} onChange={this.handleinput} placeholder='Subject'/>
            <br/>
            <textarea  rows="15" cols="50" name='supmsg' value={this.state.supmsg} onChange={this.handleinput} placeholder='Message...' style={{marginLeft:'40px',border: '2px solid #ff5520',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <a href='/supplier/BestSupplier'><button  className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>
            <a href='/supplier/ContactSupplier'><button  onClick={this.onSubmit} className='btn btn-success' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button></a>
            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}