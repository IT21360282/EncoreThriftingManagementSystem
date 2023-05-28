import React from 'react'
import NavBar from '../../../components/Navigation/NavBar'
import MyProfile from '../../../components/Profile/MyProfile'
import ProfileleftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'
import './profile.css'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileleftPane/>
        <MyProfile/>
      </div>
    </div>
  )
}