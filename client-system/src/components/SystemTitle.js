import React, { Component } from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

function PurchasingHomeFunc() {
    const un = "Sanjana Nilanka"
    return (
      <div >
        <h1 className='head-title'>Purchasing Management System</h1>
        <hr/>
        <h4 style={{marginLeft:"20px"}}>Welcome {un}</h4>
      </div>
    )
} 

function PurchasingFunc() {
    const un = "Sanjana Nilanka"
    return (
      <div >
        <h1 className='head-title'>Purchasing Management System</h1>
        <hr style={{marginLeft:"60px", marginRight:"60px"}}/>
      </div>
    )
} 


/*stock*/
function StockHomeFunc() {
  const un = "Geeshan Thisera"
  return (
    <div >
      <h1 className='head-title'>Stock Management System</h1>
      <hr/>
      <h4 style={{marginLeft:"20px"}}>Welcome {un}</h4>
    </div>
  )
} 

function StockFunc() {
  const un = "Geeshan Thisera"
  return (
    <div >
      <h1 className='head-title'>Stock Management System</h1>
      <hr/>
    </div>
  )
} 

export default class SystemTitle extends Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/purchasing/purchasing-home" element={<PurchasingHomeFunc/>}/>
                <Route path="/purchasing/:name" element={<PurchasingFunc/>}/>
                <Route path="/purchasing/:name/:name" element={<PurchasingFunc/>}/>
                <Route path="/stock/stock-home" element={<StockHomeFunc/>}/>
                <Route path="/stock/:name/:name" element={<StockFunc/>}/>
                <Route path="/stock/:name" element={<StockFunc/>}/>
            </Routes>
      </BrowserRouter>
    )
  }
}
