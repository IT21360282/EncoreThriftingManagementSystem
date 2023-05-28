import React from 'react'
import Eitems from "../../components/Eitems/Eitems";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import "./eitemsView.css"

export default function ClothesView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Eitems/>
      </div>
    </div>
  )
}
