import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import PlaceStockOrder from './purchasing/purchasing-components/PlaceStockOrder'
import DashboardHome from './dashboard/DashboardHome'
import OrderHome from './order/OrderHome'
import EmployeeHome from './employee/EmployeeHome'
import FinancialHome from './financial/FinancialHome'
import AddPaymentDetails from './financial/financial-components/AddPaymentDetails'
import ViewPaymentDetails from './financial/financial-components/ViewPaymentDetails'
import AddBankDetails from './financial/financial-components/AddBankDetails'
import ViewBankDetails from './financial/financial-components/ViewBankDetails'
import UpdatePaymentDetails from './financial/financial-components/UpdatePaymentDetails'
import UpdateBankDetails from './financial/financial-components/UpdateBankDetails'
import SalaryCalculation from './financial/financial-components/SalaryCalculation'
import FinancialRates from './financial/financial-components/FinancialRates'
import FinancialSendEmail from './financial/financial-components/SendEmail'
import FinancialReportGenerate from './financial/financial-components/ReportGenerate'
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
            <Route path="/financial/financial-home" element={<FinancialHome/>}/>
            <Route path="/financial/AddPaymentDetails" element={<AddPaymentDetails/>}/>
            <Route path="/financial/AddBankDetails" element={<AddBankDetails/>}/>
            <Route path="/financial/ViewPaymentDetails" element={<ViewPaymentDetails/>}/>
            <Route path="/financial/ViewBankDetails" element={<ViewBankDetails/>}/>
            <Route path="/financial/UpdatePaymentDetails/:id" element={<UpdatePaymentDetails/>}/>
            <Route path="/financial/UpdateBankDetails/:id" element={<UpdateBankDetails/>}/>
            <Route path="/financial/SalaryCalculation" element={<SalaryCalculation/>}/>
            <Route path="/financial/Rates" element={<FinancialRates/>}/>
            <Route path="/financial/SendEmail" element={<FinancialSendEmail/>}/>
            <Route path="/financial/ReportGenerate" element={<FinancialReportGenerate/>}/>
            <Route path="/employee-home" element={<EmployeeHome/>}/>
            <Route path="/stock-home" element={<StockHome/>}/>
            <Route path="/supplier-home" element={<SupplierHome/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
        </Routes>
    </BrowserRouter>
    )
  }
}
