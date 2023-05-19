import React from 'react'
import './cart.css'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileleftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'
import MyCart from '../../../components/Cart/MyCart'


export default function Cart() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileleftPane/>
        <MyCart/>
      </div>
    </div>
  )
}
