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
        <hr/>
      </div>
    )
} 

function SupplierHomeFunc() {
  const un = "Dhanuka Jayathilaka"
  return (
    <div >
      <h1 className='head-title'>Supplier Management System</h1>
      <hr/>
      <h4 style={{marginLeft:"20px"}}>Welcome {un}</h4>
    </div>
  )
} 

function SupplierFunc() {
  const un = "Dhanuka Jayathilaka"
  return (
    <div >
      <h1 className='head-title'>Supplier Management System</h1>
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
                <Route path="/supplier/supplier-home" element={<SupplierHomeFunc/>}/>
                <Route path="/Supplier/:name" element={<SupplierFunc/>}/>
            </Routes>
      </BrowserRouter>
    )
  }
}
