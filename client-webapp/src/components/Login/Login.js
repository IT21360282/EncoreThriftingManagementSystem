import React, { Component } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';




export default class Login extends Component {

  // const history=useNavigate();



  // const [userEmail, setUserEmail] = useState('')
  // const [userPwd, setUserPwd] = useState('')  

  // async function submit(e){
  //     e.preventDefault();
  //   //   toast.success('Welcome', {
  //   //     position: toast.POSITION.TOP_RIGHT,
  //   //     autoClose: 3000,
  //   //     toastClassName: 'toast-class',
  //   //     theme:'dark'
  //   //   });
  //     try{

  //         await axios.post("http://localhost:5000/user/Signin", {
  //           userEmail,userPwd
  //         })
  //         .then(res=>{
  //             if(res.data=="exist"){
  //                 history("/",{state:{id:userEmail}})
  //             }
  //             else if(res.data=="notexist"){
  //                 alert("User have not signed up")
  //             }
  //         })                
  //         .catch(e => {
  //             alert("wrong details")
  //             console.log(e);
  //         })
  //     }
  //     catch{
  //         console.log(e);
  //     }
  // }

  constructor(props) {
    super(props);
    this.state = {
        email:"",
        password:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
    const { email, password } = this.state;
    console.log( email, password);
    fetch("http://localhost:8000/user/Signin", {
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type":"application/json",
            Accept:"applications/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({            
            email,
            password
        }),
    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userRegister");
        if(data.status=="ok") {
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
          <h1>Sign In</h1><br/>
          <div className='dataInputlogin'>
                <label>Email </label>
                <input 
                  type='email'
                  placeholder='Enter Email' 
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
            </div>
            <br/>
            <div className='dataInputlogin'>
                <label>Password </label>
                <input 
                  type='password' 
                  onChange={(e) => this.setState({ password: e.target.value })} 
                  placeholder='Enter Password'
                />
            </div>
            <br/>
            <div className='remember'>
            <input 
                type="checkbox"
                className="rememberMe1"
                id="rememberMe"
              />
            <label className="rememberMe2" htmlFor="customCheck1">
              Remember me
            </label> 
            </div>
            <br/>
            <div className='buttonBox'>
                <button id='submitbtn' type='submit'>Submit</button><br/>
                click here for <Link to='/Signup'>signup</Link>
            </div>
    
          </div>
          </form>
        </div>
      )
    }
  }



