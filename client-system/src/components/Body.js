import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import PlaceStockOrder from './purchasing/purchasing-components/PlaceStockOrder'
import DashboardHome from './dashboard/DashboardHome'
import OrderHome from './order/OrderHome'
import EmployeeHome from './employee/EmployeeHome'
import FinancialHome from './financial/FinancialHome'
import StockHome from './stock/StockHome'
import SupplierHome from './supplier/SupplierHome'
import AddNewSupplier from './supplier/supplier-components/AddNewSupplier'
import DisplayAllSuppliers from './supplier/supplier-components/DisplayAllSuppliers'
import BestSupplier from './supplier/supplier-components/BestSupplier'
import ContactSupplier from './supplier/supplier-components/ContactSupplier'
import UpdateSupplier from './supplier/supplier-components/UpdateSupplier'
import MoreDetailsSupplier from './supplier/supplier-components/MoreDetailsSupplier'
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
            <Route path="/stock-home" element={<StockHome/>}/>
            <Route path="/supplier/supplier-home" element={<SupplierHome/>}/>
            <Route path="/supplier/AddNewSupplier" element={<AddNewSupplier/>}/>
            <Route path="/supplier/DisplayAllSuppliers" element={<DisplayAllSuppliers/>}/>
            <Route path="/supplier/BestSupplier" element={<BestSupplier/>}/>
            <Route path="/supplier/ContactSupplier" element={<ContactSupplier/>}/>
            <Route path="/supplier/UpdateSupplier/:id" element={<UpdateSupplier/>}/>
            <Route path="/supplier/MoreDetailsSupplier/:id" element={<MoreDetailsSupplier/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
        </Routes>
    </BrowserRouter>
    )
  }
}
