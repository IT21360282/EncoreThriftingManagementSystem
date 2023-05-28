import React from 'react'
import { Link } from 'react-router-dom';
import './profileLeftpane.css'

export default function LeftPane() {
    return (
      <div className='leftPaneBox'>
        <div className="leftPaneContainer">
        <div className="leftPaneMenu">
          <Link to="/Myprofile" className='leftpaneMenuItem'>
            My Profile
          </Link>
          <Link to="/Cart" className='leftpaneMenuItem'>
            My Cart
          </Link>
          <Link to="/MyOrders" className='leftpaneMenuItem'>
            My Orders
          </Link>
          <Link to="/MyReturns" className='leftpaneMenuItem'>
            My Returns
          </Link>
          <Link to="/MyReviews" className='leftpaneMenuItem'>
            My Reviews
          </Link>
        </div>
  
        </div>
      </div>
    )
  }
  