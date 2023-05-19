import React, { useState } from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Footer() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  // const [submitted, setSubmitted] = useState(false);

  const addFeedback = (e) => {
    e.preventDefault();
    setInput('');
    toast.success('Thank You For The Feedback', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      toastClassName: 'toast-class',
      theme:'dark'
    });
    
    axios
    .post('http://localhost:5000/feedbacks/save',{ feedback : input })
    .then((res) => {
      console.log(res.data);
      setItems([...items, res.data]);
      setInput("");
    })
    .catch((err) => console.log(err));
  };



  const handleChange = (e) => {
    // e.preventDefault();
    // setSubmitted(true);
    setInput(e.target.value);
    
  };




  const handleClearClick = () => {
    setInput("");
  };




  return (
    <div className='footer'>
      <div className='footer_list01'>
        <ul>
            <Link className='Link' to='/AboutUs'><li>About Us</li></Link>
            <Link className='Link' to='/CustomerCare'><li>Customer Care</li></Link>
            <Link className='Link' to='/QandA'><li>Q&A</li></Link>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
        </ul>
      </div>
      <div className='footer_list02'>
      <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Youtube</li>
        </ul>
      </div>
      <div className='footer_feedback'>
        
        <h1>feedback</h1>
        <div className='feedback_box'>
          
          <form onSubmit={addFeedback}>
          <textarea type='text' value={input} onChange={handleChange} required/>
            
            <div className='feedback_buttons'>
            <button type='button' onClick={handleClearClick}>clear</button>
            <button type='submit'>send</button>
            </div>
          </form>
          {/* {submitted && (
        <div>
          <p>Thank you for the feedback!</p>
          {setTimeout(() => {
            setSubmitted(false);
          }, 2000)}
        </div>
      )} */}
      <ToastContainer />
        </div>
        
      </div>
    </div>
  )
}
