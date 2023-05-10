import React, { Component } from 'react'
import {Route, Link, Routes, BrowserRouter} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Tabs from './Tabs';

function PurchasingFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Purchasing Management System</h4>
      <button className='home-tab' >Place Stock Order</button>
      <button className='home-tab' >Add Other Purchase</button>
      <button className='home-tab' >View All Other Purchases</button>
      <button className='home-tab' >View All Stock Orders</button>
      <button className='home-tab' >Generate Reports</button>
      <button className='home-tab' >Send Emails</button>
      <button className='home-tab' >Graph Generator</button>  
      <button className='home-tab' >Data Analyzing & Calculating</button>  
    </div>
  )
} 

function FinanceFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Financial Management System</h4>
      <a href='/financial/AddPaymentDetails'><button className='home-tab' >Add Payment Details</button></a>
      <a href='/financial/AddBankDetails'><button className='home-tab' >Add Bank Details</button></a>
      <a href='/financial/ViewPaymentDetails'><button className='home-tab' >View Payment Details</button></a>
      <a href='/financial/ViewBankDetails'><button className='home-tab' >View Bank Details</button></a>
      <a href='/financial/UpdatePaymentDetails'><button className='home-tab' >Update Payment Details</button></a>
      <a href='/financial/UpdateBankDetails'><button className='home-tab' >Update Bank Details</button></a>
      <a href='/financial/SalaryCalculation'><button className='home-tab' >Salary Calculation</button> </a> 
      <a href='/financial/Rates'><button className='home-tab' >Rates</button>  </a>
      <a href='/financial/SendEmail'><button className='home-tab' >Send an Email</button></a>
      <a href='/financial/ReportGenerate'><button className='home-tab' >Report Generation</button></a>  
    </div>
  )
} 

function DashboardFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Dashboard</h4>
      
    </div>
  )
} 

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
      <Tabs>
        <div label={<i class="fa-solid fa-bars"></i>}>
          <div className='tabBody'>
            <a href={`/dashboard-home`}><button className='system'><i class="fa-solid fa-table-cells-large"></i>&nbsp;&nbsp;&nbsp;&nbsp;Dashboard</button></a><br/><br/>
            <a href={`/order-home`}><button className='system'><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;&nbsp;&nbsp;Order Management</button></a><br/><br/>
            <a href={`/financial/financial-home`}><button className='system'><i class="fa-solid fa-hand-holding-dollar"></i>&nbsp;&nbsp;&nbsp;&nbsp;Financial Management</button></a><br/><br/>
            <a href={`/employee-home`}><button className='system'><i class="fa-solid fa-id-card"></i>&nbsp;&nbsp;&nbsp;&nbsp;Employee Management</button></a><br/><br/>
            <a href={`/stock-home`}><button className='system'><i class="fa-solid fa-boxes-stacked"></i>&nbsp;&nbsp;&nbsp;&nbsp;Stock Management</button></a><br/><br/>
            <a href={`/supplier-home`}><button className='system'><i class="fa-solid fa-truck-field"></i>&nbsp;&nbsp;&nbsp;&nbsp;Supplier Management</button></a><br/><br/>
            <a href={`/purchasing/purchasing-home`}><button className='system'><i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;&nbsp;&nbsp;Purchasing Management</button></a><br/><br/>
            <a href={`/delivery-home`}><button className='system'><i class="fa-solid fa-truck"></i>&nbsp;&nbsp;&nbsp;&nbsp;Delivery Management</button></a>
          </div>
        </div>
        <div label={<i class="fa-solid fa-house"></i>}>
        <BrowserRouter>
          <Routes>
              <Route path="/purchasing/:name" element={<PurchasingFunc/>}/>
              <Route path="/dashboard-home" element={<DashboardFunc/>}/>
              <Route path="/financial/:name" element={<FinanceFunc/>}/>
          </Routes>
        </BrowserRouter>
        </div>
        <div label={<i class="fa-solid fa-gear"></i>}>
          <div className='setting'> 
            <div><h4>Dark Mode</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 2</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 3</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div><div className='setting'> 
            <div><h4>Setting 4</h4></div>
            <div>
              <label class="switch">
              <input type="checkbox"/>
              <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
    )
  }
}

export default SideBar