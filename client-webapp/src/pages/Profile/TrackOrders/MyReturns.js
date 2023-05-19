import React from 'react'
import './myreturns.css'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileLeftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'
import MyReturn from '../../../components/MyReturn/MyReturn'

export default function MyReturns() {
  return (
    <div>
        <NavBar/>
      <div className="bottomContainer">
        <ProfileLeftPane/>
        <MyReturn/>
      </div>
    </div>
  )
}
