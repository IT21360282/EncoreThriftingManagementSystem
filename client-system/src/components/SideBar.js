import React, { Component } from 'react'
import {Route, Link, Routes, BrowserRouter} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Tabs from './Tabs';

function PurchasingFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Purchasing Management System</h4>
      <a href={`/purchasing/place-order`}><button className='home-tab' >Place Stock Order</button></a>
      <a href={`/purchasing/add-purchase`}><button className='home-tab' >Add Other Purchase</button></a>
      <a href={`/purchasing/display-orders`}><button className='home-tab' >View All Stock Orders</button></a>
      <a href={`/purchasing/display-purchases`}><button className='home-tab' >View All Other Purchases</button></a>
      <a href='/purchasing/generate-report'><button className='home-tab' >Generate Reports</button></a>
      <a href='/purchasing/send-mails'><button className='home-tab' >Send Emails</button></a>
      <button className='home-tab' >Graph Generator</button>  
      <button className='home-tab' >Data Analyzing & Calculating</button>  
    </div>
  )
} 

//stock
function StockFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Stock Management System</h4>
      <a href='/stock/add-item'><button className='home-tab' >Add Item</button></a>
      <a href={`/stock/damaged-item`}><button className='home-tab' >Damaged Item List</button></a>
      <a href={`/stock/disposed-item`}><button className='home-tab' >Disposed Item List</button></a>
      <a href={`/stock/released-item`}><button className='home-tab' >Released Item List</button></a>
      <a href={`/stock/view-lowstock-item`}><button className='home-tab' >Low Stock Item List</button></a>
      <a href={`/stock/stock-out`}><button className='home-tab' >Low </button></a>
      <a href={`/stock/generate-report`}><button className='home-tab' >Generate Reports</button></a>
      <a href={`/stock/mail`}><button className='home-tab' >Send Emails</button></a>
       
        
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
            <a href={`/financial-home`}><button className='system'><i class="fa-solid fa-hand-holding-dollar"></i>&nbsp;&nbsp;&nbsp;&nbsp;Financial Management</button></a><br/><br/>
            <a href={`/employee-home`}><button className='system'><i class="fa-solid fa-id-card"></i>&nbsp;&nbsp;&nbsp;&nbsp;Employee Management</button></a><br/><br/>
            <a href={`/stock/stock-home`}><button className='system'><i class="fa-solid fa-boxes-stacked"></i>&nbsp;&nbsp;&nbsp;&nbsp;Stock Management</button></a><br/><br/>
            <a href={`/supplier-home`}><button className='system'><i class="fa-solid fa-truck-field"></i>&nbsp;&nbsp;&nbsp;&nbsp;Supplier Management</button></a><br/><br/>
            <a href={`/purchasing/purchasing-home`}><button className='system'><i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;&nbsp;&nbsp;Purchasing Management</button></a><br/><br/>
            <a href={`/delivery-home`}><button className='system'><i class="fa-solid fa-truck"></i>&nbsp;&nbsp;&nbsp;&nbsp;Delivery Management</button></a>
          </div>
        </div>
        <div label={<i class="fa-solid fa-house"></i>}>
        <BrowserRouter>
          <Routes>
              <Route path="/purchasing/:name" element={<PurchasingFunc/>}/>
              <Route path="/purchasing/:name/:name" element={<PurchasingFunc/>}/>
              <Route path="/stock/:name" element={<StockFunc/>}/>
              <Route path="/stock/:name/:name" element={<StockFunc/>}/>
              <Route path="/dashboard-home" element={<DashboardFunc/>}/>
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