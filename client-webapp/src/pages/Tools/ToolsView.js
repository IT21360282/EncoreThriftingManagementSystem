import React from 'react'
import Tools from "../../components/Tools/Tools";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import "./toolsView.css"

export default function ClothesView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Tools/>
      </div>
    </div>
  )
}
