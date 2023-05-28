import React from 'react'
import './reviews.css'


export default function EditReviews() {
  return (
    <div className='displayBox'>
      <h3 className='pageTitle'>Edit Review</h3>
      <div className='editBox'>
      <div className='textArea'>
      <textarea className='textArea'/>
      </div>
      <button>Edit</button>
      </div>
    </div>
  )
}
