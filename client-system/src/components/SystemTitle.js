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


<<<<<<< HEAD
/*stock*/
function StockHomeFunc() {
  const un = "Geeshan Thisera"
  return (
    <div >
      <h1 className='head-title'>Stock Management System</h1>
=======
function EmployeeHomeFunc() {
  const un = "Nethmi Tharushi"
  return (
    <div >
      <h1 className='head-title'>Employee Management System</h1>
>>>>>>> IT21383816_DeSilvaKPNT
      <hr/>
      <h4 style={{marginLeft:"20px"}}>Welcome {un}</h4>
    </div>
  )
} 

<<<<<<< HEAD
function StockFunc() {
  const un = "Geeshan Thisera"
  return (
    <div >
      <h1 className='head-title'>Stock Management System</h1>
=======
function EmployeeFunc() {
  const un = "Nethmi Tharushi"
  return (
    <div >
      <h1 className='head-title'>Employee Management System</h1>
>>>>>>> IT21383816_DeSilvaKPNT
      <hr/>
    </div>
  )
} 

export default class SystemTitle extends Component {
<<<<<<< HEAD
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
=======
render() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/purchasing/purchasing-home" element={<PurchasingHomeFunc/>}/>
              <Route path="/purchasing/:name" element={<PurchasingFunc/>}/>
              <Route path="/employee-home" element={<EmployeeHomeFunc/>}/>
              <Route path="/employee/:name" element={<EmployeeFunc/>}/>
          </Routes>
    </BrowserRouter>
  )
}
>>>>>>> IT21383816_DeSilvaKPNT
}
