import React from 'react'
import LeftPane from '../../components/LeftPane/LeftPane'
import NavBar from '../../components/Navigation/NavBar'
import './customerCare.css'
import CustomerC from '../../components/CustomerCare/CustomerC'

export default function CustomerCare() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <CustomerC/>
      </div>
    </div>
  )
}
