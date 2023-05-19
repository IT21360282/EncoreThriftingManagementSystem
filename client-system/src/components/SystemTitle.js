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
      </div>
  )
}

function EmployeeHomeFunc() {
  const un = "Nethmi Tharushi"
  return (
    <div >
      <h1 className='head-title'>Employee Management System</h1>
      </div>
  )
}

function SupplierHomeFunc() {
  const un = "Dhanuka Jayathilaka"
  return (
    <div >
      <h1 className='head-title'>Supplier Management System</h1>
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

function StockFunc() {
  const un = "Geeshan Thisera"
  return (
    <div >
      <h1 className='head-title'>Stock Management System</h1>
      </div>
  )
}

function EmployeeFunc() {
  const un = "Nethmi Tharushi"
  return (
    <div >
      <h1 className='head-title'>Employee Management System</h1>
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
                <Route path="/purchasing/:name/:name" element={<PurchasingFunc/>}/>
                <Route path="/stock/stock-home" element={<StockHomeFunc/>}/>
                <Route path="/stock/:name/:name" element={<StockFunc/>}/>
                <Route path="/stock/:name" element={<StockFunc/>}/>
                <Route path="/supplier-home" element={<SupplierHomeFunc/>}/>
                <Route path="/Supplier/:name" element={<SupplierFunc/>}/>
                <Route path="/employee-home" element={<EmployeeHomeFunc/>}/>
                <Route path="/employee/:name" element={<EmployeeFunc/>}/>
                <Route path="/financial-home" element={<FinancialHomeFunc/>}/>
                <Route path="/financial/:name" element={<FinancialFunc/>}/>
                <Route path="/financial/:name/:name" element={<FinancialFunc/>}/>
            </Routes>
      </BrowserRouter>
    )
  }

}
