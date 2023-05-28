import React, { Component } from 'react'
import './signup.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'



export default class SignUp extends Component {

//user signup data pass to the console
constructor(props) {
    super(props);
    this.state = {
        fname:"",
        lname:"",
        email:"",
        password:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch("http://localhost:8000/user/Signup", {
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type":"application/json",
            Accept:"applications/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            fname,
            email,
            lname,
            password
        }),
    }).then((res) => res.json())
    .then((data) => {
        // console.log(data, "userRegister");
        if(data.status==="ok") {
            alert("login successful");
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("loggedIn", true);
            window.location.href="/";
          }
    })
  }







render(){
        return (
            <div className='displayBox'>
            <form onSubmit={this.handleSubmit}>
            
            <div className='loginBox'>
            <h1>Sign Up</h1>
            <div className='dataInput'>
                    <label>First Name </label>
                    <input 
                    type='text' 
                    onChange={e=>this.setState({fname:e.target.value})} 
                    placeholder='Enter First  Name' 
                    />
                </div>
                <br/>
                <div className='dataInput'>
                    <label>Last Name </label>
                    <input 
                    type='text' 
                    onChange={e=>this.setState({lname:e.target.value})} 
                    placeholder='Enter Last Name'
                    />
                </div>
                <br/>
                <div className='dataInput'>
                    <label>Email </label>
                    <input 
                    type='email' 
                    onChange={e=>this.setState({email:e.target.value})} 
                    placeholder='Enter Email' 
                    />
                </div>
                <br/>
                <div className='dataInput'>
                    <label>Password </label>
                    <input 
                        type='password' 
                        onChange={e=>this.setState({password:e.target.value})} 
                        placeholder='Enter Password'
                    />
                </div>
                <br/>
                <br/>
                <div className='buttonBox'>
                    <button id='submitbtn' type='submit'>Sign Up</button>
                </div>
                <br/>
                    <p className='links'>
                        Already registered <Link to='/Signin'>sign in?</Link>
                    </p>
            </div>
            </form>    
            </div>
        )
    }  
}
