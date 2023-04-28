import axios from 'axios'
import React, { Component } from 'react'
import ReactModal from 'react-modal'

export default class SendMails extends Component {
    constructor(props){
        super(props)
        this.state = {
            from:"encorethriftinglk@gmail.com",
            to:"",
            subject:"",
            msg:"",
            name:"",
            isSuccess:false,
            isOpen:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlePopUp = this.handlePopUp.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
        })
    }

    handlePopUp = () => {
        this.setState({isOpen:!this.state.isOpen})
    } 

    onSubmit(){
        const {to,subject,msg,name} = this.state
        const data = {
            name:name,
            email:to,
            subject:subject,
            msg:msg
        }
        axios.post('http://localhost:8000/purchasingPost/sendEmail',data).then((res) => {
            console.log(res)
            this.setState({isSuccess:true})
            this.setState({
                to:"",
                subject:"",
                msg:"",
                name:"",
            })
        }).catch((err) => {
            console.log(err)
            this.setState({isSuccess:false})
        })
        this.handlePopUp()
    }

  render() {
    const name =this.state.name
    let isSuccessMsg = ''
    if(this.state.isSuccess){
        isSuccessMsg = `Email Send Successfully sent to ${name}`
    }
    else{
        isSuccessMsg = "Email didn't send! Error Orrccured!"
    }
    return (
      <div className='Purchasing-others'>
        <h2 style={{marginTop:"70px"}}>Send Emails</h2>
        <div className='gray-box' style={{overflowY:"scroll",height:"56vh", padding:"20px 20%"}}> 
            <input type='text' className='form-input' name='from' placeholder='From' value={this.state.from} onChange={this.handleInputChange} title='You Cannot Change Compnay Email' style={{width:"100%"}} readOnly/><br/>
            <input type='text' className='form-input' name='to' placeholder='To' value={this.state.to} onChange={this.handleInputChange} style={{width:"100%"}} required/><br/> 
            <input type='text' className='form-input' name='name' placeholder='Name of Receiver' value={this.state.name} onChange={this.handleInputChange} style={{width:"100%"}} required/><br/> 
            <input type='text' className='form-input' name='subject' placeholder='Subject' value={this.state.subject} onChange={this.handleInputChange} style={{width:"100%"}} required/><br/> 
            <textarea className='form-textarea-purchasing' name='msg' cols={30} rows={4} placeholder='Message' value={this.state.msg} onChange={this.handleInputChange} style={{padding:"5px"}} required></textarea>   
            <div style={{width:"100%"}}>
                <a onClick={this.handlePopUp}><button className='btn btn-success' onClick={this.onSubmit} style={{float:"right",width:"120px"}}>Send</button></a>
                <br/>
                <br/>
            </div>     
            <ReactModal isOpen={this.state.isOpen}onRequestClose={this.handlePopUp} className="popUp20 zoom-in">
                <h2>{isSuccessMsg}</h2>
            </ReactModal>
        </div>
      </div>
    )
  }
}
