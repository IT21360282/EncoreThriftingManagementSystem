import React from 'react'
import NavBar from '../../components/Navigation/NavBar'
import Pay02 from '../../components/Pay/Pay02'


export default function PaymentPhase01() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">

        <Pay02/>
      </div>
    </div>
  )
}
