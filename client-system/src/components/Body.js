import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import DashboardHome from './dashboard/DashboardHome'
import OrderHome from './order/OrderHome'
import EmployeeHome from './employee/EmployeeHome'
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
            <Route path="/purchasing-home" element={<PurchasingHome/>}/>
            <Route path="/dashboard-home" element={<DashboardHome/>}/>
            <Route path="/order-home" element={<OrderHome/>}/>
            <Route path="/financial-home" element={<FinancialHome/>}/>
            <Route path="/employee-home" element={<EmployeeHome/>}/>
            <Route path="/stock-home" element={<StockHome/>}/>
            <Route path="/supplier-home" element={<SupplierHome/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
        </Routes>
    </BrowserRouter>
    )
  }
}
