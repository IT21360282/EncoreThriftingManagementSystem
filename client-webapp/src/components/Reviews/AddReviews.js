import React from 'react'
import './reviews.css'


export default function AddReviews() {
  return (
    <div className='displayBox'>
      <h3 className='pageTitle'>Add Review</h3>
      <div className='addBox'>
      <div className='textArea'>
        <textarea className='textArea'/>
      </div>
      <button>Save</button>
      </div>
    </div>
  )
}
