import React from 'react'
import Furniture from "../../components/Furniture/Furniture";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import "./furnitureView.css"

export default function ClothesView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Furniture/>
      </div>
    </div>
  )
}
