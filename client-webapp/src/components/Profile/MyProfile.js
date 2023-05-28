import React, { Component } from 'react'
import './profile.css'
import { Link } from 'react-router-dom'




export default class MyProfile extends Component {

  

  constructor(props){
    super(props);
    this.state = {
       userData: "", 
    }
  }
  
  componentDidMount(){
    fetch("http://localhost:8000/user/MyProfile", {
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type":"application/json",
            Accept:"applications/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
        if(data.data==="token expired"){
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href="/Signin";
        }
    });
  }

  logout=()=>{
    window.localStorage.clear();
    window.location.href="/Signin";
  }

  deleteUser = () => {
    const userId = this.state.userData._id;
    fetch(`http://localhost:8000/user/deleteUserById/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Handle the response as needed
        // Redirect to the desired page or show a success message
        this.props.history.push('/Home');
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  };
  


render(){
    return (
      <div className='displayBox'>
        <h3 className='pageTitle'>My Profile</h3>
        <div className='profileBox'>
        <form>
        <div className='dataInput'>
              <p>First Name : {this.state.userData.fname}</p>
          </div>
          <div className='dataInput'>

              <p>Last Name : {this.state.userData.lname}</p>
              
          </div>
          <div className='dataInput'>
              
              <p>Email : {this.state.userData.email}</p>
              
          </div>
          <div className='dataInput'>

              <p>Mobile : {this.state.userData.mobile}</p>
              
          </div>
          <div className='dataInput'>
            <p>Birthday: {new Date(this.state.userData.dob).toLocaleDateString()}</p>
          </div>


          <div className='dataInput'>
              
              <p>Delivery Address : {this.state.userData.address}</p>
              
          </div>
        </form>
          <br/>
          <div className='buttonBox'>
            <Link to='/EditProfile'>
              <button>Edit Profile</button>
            </Link> 
              {/* <button>CHANGE PASSWORD</button> */}
              <button onClick={this.deleteUser}>Delete Profile</button>
              <button onClick={this.logout}>Log Out</button>
              
          </div>
        </div>
      </div>
    )
  }
}
