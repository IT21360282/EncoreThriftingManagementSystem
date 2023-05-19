import React from 'react'
import './pageReviews.css'
import AddReviews from '../../../components/Reviews/AddReviews'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileLeftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'




export default function AddReview() {
  return (
    <div>
    <NavBar/>
    <div className="bottomContainer">
      <ProfileLeftPane/>
      <AddReviews/>
        </div>
    </div>
  )
}
