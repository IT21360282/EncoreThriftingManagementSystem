import React from 'react'
import Clothes from "../../components/Clothes/Clothes";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import "./clothesView.css"

export default function ClothesView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Clothes/>
      </div>
    </div>
  )
}
