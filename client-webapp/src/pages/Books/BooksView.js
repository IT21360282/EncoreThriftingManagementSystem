import React from 'react'
import Books from "../../components/Books/Books";
import LeftPane from "../../components/LeftPane/LeftPane";
import NavBar from "../../components/Navigation/NavBar";
import './booksView.css'




export default function BooksView() {
  return (
    <div>
      <NavBar/>
      <div className="bottomContainer">
        <LeftPane/>
        <Books/>
      </div>
    </div>
  )
}
