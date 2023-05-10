import React, { Component } from "react";
import { Route, Link, Routes, BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Tabs from "./Tabs";

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
      <a href='/purchasing/data-analysis'><button className='home-tab' >Data Analysis</button></a>
      
      
    </div>
  )
} 

function SupplierFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Supplier Management System</h4>
      <a href='/supplier/supplier-home'><button className='home-tab' >Home</button></a>
      <a href='/supplier/AddNewSupplier'><button className='home-tab' >Add New Suppliers</button></a>
      <a href='/supplier/DisplayAllSuppliers'><button className='home-tab' >Display All Suppliers</button></a>
      <a href='/supplier/BestSupplier'><button className='home-tab' >Find Best Suppliers</button></a>
      <a href='/supplier/BestSupplier'><button className='home-tab' >Contact Suppliers</button></a>
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
  );
}

function DashboardFunc() {
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Dashboard</h4>

      <button className="home-tab">
        <a href="/dashboard-home/graph">Manager Graph</a>
      </button>
      <button className="home-tab">
        <a href="/dashboard-home/manager">Manager Management</a>
      </button>
      <button className="home-tab">
        <a href="/dashboard-home/category">Add categories</a>
      </button>
      <button className="home-tab">
        <a href="/dashboard-home/Notes">Notes</a>
      </button>
      <button className="home-tab">
        <a href="/dashboard-home/Catgraph">Category Graph</a>
      </button>
      <button className="home-tab">
        <a href="/dashboard-home/contact">Contact</a>
      </button>
    </div>
  );
}

function EmployeeFunc() {
  return (
    <div>
      <h4 style={{textAlign:"center"}}>Employee Management System</h4>
      <a href='/employee/add-employee'><button className='home-tab' >Add Employee Details</button></a>
      <a href='/employee/employee-attendanceDetails'><button className='home-tab' >Employee Attendance Details</button></a>
      <a href='/employee/employee-leave'><button className='home-tab' >Employee Leave Management</button></a>
      <a href='/employee/DisplayAllEmployeeDetails'><button className='home-tab' >View Employee details</button></a>
      <a href='/employee/Generate-report'><button className='home-tab' >Generate Reports</button></a>
      <a href='/employee/employee-mails'><button className='home-tab' >Send Emails</button></a>
      <a href='/employee/graph-generator'><button className='home-tab' >Graph Generator</button></a> 
      <a href='/employee/data-analyze'><button className='home-tab' >Data Analyzing & Calculating</button></a> 
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
                  <Route path="/dashboard-home/:name" element={<DashboardFunc/>}/>
                  <Route path="/dashboard-home/:name/:name" element={<DashboardFunc/>}/>
                  <Route path="/employee-home" element={<EmployeeFunc/>}/>
                  <Route path="/employee/:name" element={<EmployeeFunc/>}/>
                  <Route path="/supplier/:name" element={<SupplierFunc/>}/>
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
            </div>
          </div>
        </Tabs> 
      </div>

      
    )
  }
}

export default SideBar;
