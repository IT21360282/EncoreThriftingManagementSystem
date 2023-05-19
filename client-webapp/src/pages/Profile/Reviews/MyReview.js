import React from 'react'
import './pageReviews.css'
import MyReviews from '../../../components/Reviews/MyReviews'
import NavBar from '../../../components/Navigation/NavBar'
import ProfileLeftPane from '../../../components/ProfileLeftPane/ProfileLeftPane'


export default function MyReview() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <ProfileLeftPane/>
        <MyReviews/>
    </div>
  </div>
  )
}
