import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import PlaceStockOrder from './purchasing/purchasing-components/PlaceStockOrder'
import DashboardHome from './dashboard/DashboardHome'
import OrderHome from './order/OrderHome'
import EmployeeHome from './employee/EmployeeHome'
import AddEmployeeDetails from './employee/employee-components/AddEmployeeDetails'
import DisplayAllEmployeeDetails from './employee/employee-components/DisplayAllEmployeeDetails'
import EmployeeLeave from './employee/employee-components/EmployeeLeave'
import UpdateEmployee from './employee/employee-components/UpdateEmployeeDetails'
import EmployeeMails from './employee/employee-components/EmployeeMails'
import EmployeeAttendance from './employee/employee-components/EmployeeAttendance'
import FinancialHome from './financial/FinancialHome'
import StockHome from './stock/StockHome'
import SupplierHome from './supplier/SupplierHome'
import DeliveryHome from './delivery/DeliveryHome'

export default class Body extends Component {
  render() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/purchasing/purchasing-home" element={<PurchasingHome/>}/>
            <Route path="/purchasing/place-order" element={<PlaceStockOrder/>}/>
            <Route path="/dashboard-home" element={<DashboardHome/>}/>
            <Route path="/order-home" element={<OrderHome/>}/>
            <Route path="/financial-home" element={<FinancialHome/>}/>
            <Route path="/employee-home" element={<EmployeeHome/>}/>
            <Route path="/employee/add-employee" element={<AddEmployeeDetails/>}/>
            <Route path="/employee/DisplayAllEmployeeDetails" element={<DisplayAllEmployeeDetails/>}/>
            <Route path="/employee/employee-leave" element={<EmployeeLeave/>}/>
            <Route path="/employee/update-employee/:id" element={<UpdateEmployee/>}/>
            <Route path="/employee/employee-mails" element={<EmployeeMails/>}/>
            <Route path="/employee/employee-Attendance" element={<EmployeeAttendance/>}/>
            <Route path="/stock-home" element={<StockHome/>}/>
            <Route path="/supplier-home" element={<SupplierHome/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
        </Routes>
    </BrowserRouter>
    )
  }
}
