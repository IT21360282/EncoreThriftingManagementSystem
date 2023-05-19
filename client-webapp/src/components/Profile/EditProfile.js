import React, { useEffect, useState } from 'react'
import './profile.css'
import {  useNavigate } from 'react-router-dom';

import axios from 'axios';


export default function MyProfile() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");




  const [userData, setUserData] = useState({
    mobile: '',
    bod: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/user/MyProfile', { token });
        const { status, data } = response.data;
        if (status === 'ok') {
          setUserData(data);
        } else if (status === 'error') {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  


  useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await axios.post('http://localhost:8000/user/MyProfile', { token });
        const { status, data } = response.data;
        if (status === 'ok') {
          setUserData(data);
          setLoading(false);
        } else if (status === 'error') {
          console.error(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }


  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };



  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };



  const handleEditInputChange = (e) => {
    e.preventDefault();

    // Do something with the updated values (e.g., send a request to the server)
    const updatedData = {
      mobile,
      dob,
      address
    };

    // Get the userId from userData
    const userId = userData && userData._id;



    // Send the updated data to the server
    axios.put(`http://localhost:8000/user/updateUser/${userId}`, updatedData)
    .then((response) => {
      console.log(response.data);
      // Handle the response as needed

      //rediect to the MyProfile
      navigate('/MyProfile');
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    });
  
  }



  
  
  return (
    <div className='displayBox'>
      <h3 className='pageTitle'>Edit profile</h3>
        <form onSubmit={handleEditInputChange}>
        <div className='profileBox'>
        <div className='dataInput'>
            <label>First Name </label>
            <input value={userData.fname} readOnly/>
        </div>
        <br/>
        <div className='dataInput'>
            <label>Last Name </label>
            <input value={userData.lname} readOnly/>
        </div>
        <br/>
        <div className='dataInput'>
            <label>Email Address </label>
            <input value={userData.email} readOnly/>
        </div>
        <br/>
        <div className='dataInput'>
            <label>Mobile :</label>
            <input placeholder={`${userData.mobile}`} value={mobile} onChange={handleMobileChange}/> 
        </div>

        <br/>
        <div className='dataInput'>
            <label htmlFor="datetime">Birthday</label>
            <input type="date" id="date" name="date" value={dob} onChange={handleDobChange}/>            
        </div>
        <br/>

        <br/>
        <div className='dataInput'>
            <label>Delivery Address </label>
            <input placeholder={`${userData.address}`} value={address} onChange={handleAddressChange}/>
        </div>

        <br/>
        <div className='buttonBox'>
            <button type='submit'>SAVE</button>
        </div>
      </div>
        </form>
    </div>
  )
}
