/*import React, { Component } from 'react'
import '../Employee.css'

export default class EmployeeMails extends Component{
  render() {
    return (
        <div>
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Contact Employees</h2>
            <br/>
            <div id="EmailEmployeerectangle">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <input type='text' className='inputEmployeeemail' placeholder='To'/>
            <br/>
            <input type='text' className='inputEmployeeemail' placeholder='Subject'/>
            <br/>
            <textarea name="address" rows="15" cols="50" placeholder='Message...' style={{marginLeft:'40px',border: '2px solid #ff5520',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <a><button type='submit' className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>
            <button type='submit' className='btn btn-success' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button>
            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}
*/

import React, { Component } from 'react'
import axios from 'axios'
import '../employee.css'


export default class EmployeeMails extends Component{
constructor(props){
  super(props)
  this.state={
     sender:'encorethriftinglk@gmail.com',
     empreciever:'',
     empSubject:'',
     empmsg:''
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
  const {empreciever,empSubject,empmsg}=this.state
 const mail={
  empreciever:empreciever,
  empSubject:empSubject, 
  empmsg:empmsg
 } 

 axios.post("http://localhost:8000/employeePost/EmployeeMails",mail).then((response)=>{
  console.log("success")
  this.state({success:true})
}).catch(error=>{
   console.error("Error Occured:",error)
  })

  }

  render() {
    return (
        <div>
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Contact Employee</h2>
            <br/>
            <div id="EmailEmployeerectangle">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <br/>
            <input type='text' className='inputEmployeeemail' name='sender' value={this.state.sender} readOnly/>
            <br/>
            <input type='text' className='inputEmployeeemail' name='empreciever' value={this.state.empreciever} onChange={this.handleinput} placeholder='To'/>
            <br/>
            <input type='text' className='inputEmployeeemail' name='empSubject' value={this.state.empSubject} onChange={this.handleinput} placeholder='Subject'/>
            <br/>
            <textarea  rows="15" cols="50" name='empmsg' value={this.state.empmsg} onChange={this.handleinput} placeholder='Message...' style={{marginLeft:'40px',border: '2px solid #ff5520',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <a href='/employee-home'><button  className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>
        
            <a href='/employee/employee-mails'><button onClick={this.onSubmit} className='btn btn-success' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button></a>
            </center>
            <br/>
            </div>
            <br/>
        </div>
    )
  }
}