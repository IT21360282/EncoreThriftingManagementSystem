import React from 'react'
import './pageReviews.css'
import EditReviews from '../../../components/Reviews/EditReviews'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileLeftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'


export default function EditRevies() {
  return (
    <div>
    <NavBar/>
    <div className="bottomContainer">
      <ProfileLeftPane/>
      <EditReviews/>
        </div>
    </div>
  )
}
