import React from 'react'
import Gifts from "../../components/Gifts/Gifts";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import "./giftView.css"

export default function ClothesView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Gifts/>
      </div>
    </div>
  )
}
