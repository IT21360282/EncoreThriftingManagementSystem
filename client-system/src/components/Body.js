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
import DeliveryHome from './delivery/DeliveryHome'
import DisplayStockOrders from './purchasing/purchasing-components/DisplayStockOrders'
import DisplaySpecificStockOrder from './purchasing/purchasing-components/DisplaySpecificStockOrder'
import TestPurchasing from './purchasing/purchasing-components/TestPurchasing'
import AddOtherPurchase from './purchasing/purchasing-components/AddOtherPurchase'
import DisplayOtherPurchases from './purchasing/purchasing-components/DisplayOtherPurchases'
import UpdateOtherPurchase from './purchasing/purchasing-components/UpdateOtherPurchase'
import DisplaySpecificOtherPurchase from './purchasing/purchasing-components/DisplaySpecificOtherPurchase'
import SearchStockOrders from './purchasing/purchasing-components/SearchStockOrders'
import GenerateReport from './purchasing/purchasing-components/GenerateReport'
import SendMails from './purchasing/purchasing-components/SendMails'
import GenerateGraph from './purchasing/purchasing-components/GenerateGraph'
import PurchasingCalculating from './purchasing/purchasing-components/PurchasingCalculating'

export default class Body extends Component {
  render() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/purchasing/purchasing-home" element={<PurchasingHome/>}/>
            <Route path="/purchasing/place-order" element={<PlaceStockOrder/>}/>
            <Route path="/purchasing/add-purchase" element={<AddOtherPurchase/>}/>
            <Route path="/purchasing/update-purchase/:id" element={<UpdateOtherPurchase/>}/>
            <Route path="/purchasing/display-orders" element={<DisplayStockOrders/>}/>
            <Route path="/purchasing/display-purchases" element={<DisplayOtherPurchases/>}/>
            <Route path="/purchasing/:id" element={<DisplaySpecificStockOrder/>}/>
            <Route path="/purchasing/TestPurchasing" element={<TestPurchasing/>}/>
            <Route path="/purchasing/spec-purchase/:id" element={<DisplaySpecificOtherPurchase/>}/>
            <Route path="/purchasing/search-order/:name" element={<SearchStockOrders/>}/>
            <Route path="/purchasing/generate-report" element={<GenerateReport/>}/>
            <Route path="/purchasing/generate-graph" element={<GenerateGraph/>}/>
            <Route path="/purchasing/send-mails" element={<SendMails/>}/>
            <Route path="/purchasing/calc" element={<PurchasingCalculating/>}/>


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
