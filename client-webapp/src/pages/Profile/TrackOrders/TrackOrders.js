import React from 'react'
import './myreturns.css'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileLeftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'
import MyOrders from '../../../components/MyOrders/MyOrders'



export default function TrackOrders() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileLeftPane/>
        <MyOrders/>
      </div>
    </div>
  )
}
