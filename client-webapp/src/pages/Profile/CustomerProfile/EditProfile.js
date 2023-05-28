import React from 'react'
import NavBar from '../../../components/Navigation/NavBar'
import EditProfile from '../../../components/Profile/EditProfile'
import ProfileleftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'
import './profile.css'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileleftPane/>
        <EditProfile/>
      </div>
    </div>
  )
}