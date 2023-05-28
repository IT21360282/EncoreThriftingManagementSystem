import React from 'react'
import "./leftPane.css"
import { Link } from 'react-router-dom';




export default function LeftPane() {
  return (
    <div className='leftPaneBox'>
      <div className="leftPaneContainer">
      <div className="leftPaneMenu">
        <Link to="/BooksView" className='leftpaneMenuItem'>
          Books
        </Link>
        <Link to="/EitemsView" className='leftpaneMenuItem'>
          Electronics & Electrical
        </Link>
        <Link to="/ClothesView" className='leftpaneMenuItem'>
          Clothes
        </Link>
        <Link to="/FurnitureView" className='leftpaneMenuItem'>
          Furniture
        </Link>
        <Link to="/ToolsView" className='leftpaneMenuItem'>
          Tools
        </Link>
        <Link to="/GiftsView" className='leftpaneMenuItem'>
          Toys
        </Link>
      </div>

      </div>
    </div>
  )
}
