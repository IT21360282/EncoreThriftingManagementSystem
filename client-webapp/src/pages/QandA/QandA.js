import React from 'react'
import LeftPane from '../../components/LeftPane/LeftPane'
import NavBar from '../../components/Navigation/NavBar'
import './qAnda.css'
import QandAcom from '../../components/QandA/QandAcom'

export default function QandA() {
  return (
    <div >
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <QandAcom/>
      </div>
    </div>
  )
}
