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

function FinancialHomeFunc() {
  const un = "Yoshitha Tennakoon"
  return (
    <div >
      <h1 className='head-title'>Financial Management System</h1>
      <hr/>
      <h4 style={{marginLeft:"20px"}}>Welcome {un}</h4>
    </div>
  )
  }
  function FinancialFunc() {
    const un = "Yoshitha Tennakoon"
    return (
      <div >
        <h1 className='head-title'>Financial Management System</h1>
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
                <Route path="/financial/financial-home" element={<FinancialHomeFunc/>}/>
                <Route path="/financial/:name" element={<FinancialFunc/>}/>
                <Route path="/financial/:name/:name" element={<FinancialFunc/>}/>
            </Routes>
      </BrowserRouter>
    )
  }
}
