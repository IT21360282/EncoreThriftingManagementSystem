import React from 'react'
import './itemViewpage.css'
import NavBar from '../../components/Navigation/NavBar'
import LeftPane from '../../components/LeftPane/LeftPane'
import ItemView from '../../components/ItemView/ItemView'



export default function ItemViewpage() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <ItemView/>
      </div>
    </div>
  )
}
