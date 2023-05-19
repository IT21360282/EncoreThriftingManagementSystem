import React from 'react'
import './pay02.css'


export default function Pay02() {
  return (
<div className='displayBox'>
 <div className='paymentbox02'>
    <div className='dataInput'>
      <lable>Card Number</lable>
      <input/>
    </div>
    <div className='dataInput'>
      <lable>Exp</lable>
      <input/>
    </div>
    <div className='dataInput'>
      <lable>CVV</lable>
      <input/>
    </div>
    <div className='dataInput'>
      <lable>Email</lable>
      <input/>
    </div>
    <div className='dataInput'>
      <lable>Phone Number</lable>
      <input/>
    </div>
    <div>
    <button>Pay</button>
    </div> 
  </div>
    
</div>
)
}
