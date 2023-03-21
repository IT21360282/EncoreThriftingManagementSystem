import React from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Body from './components/Body'

import './App.css';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className='App'>
      <div><Header /></div>
      <div>
        <div className='split left'><SideBar /></div>
        <div className='split right'><Body /></div>
      </div>
      <br/>
    </div>
    
  )
}

export default App;
