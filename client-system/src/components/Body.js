import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import PlaceStockOrder from './purchasing/purchasing-components/PlaceStockOrder'



//stock

import AddEmployeeDetails from './employee/employee-components/AddEmployeeDetails'
import DisplayAllEmployeeDetails from './employee/employee-components/DisplayAllEmployeeDetails'
import EmployeeLeave from './employee/employee-components/EmployeeLeave'
import UpdateEmployee from './employee/employee-components/UpdateEmployeeDetails'
import EmployeeMails from './employee/employee-components/EmployeeMails'
import EmployeeAttendance from './employee/employee-components/EmployeeAttendance'
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
import SubCategory from '../components/stock/stock-components/SubCategory'
import ItemView from '../components/stock/stock-components/ItemViewPage'
import AddItem from '../components/stock/stock-components/AddItem'
import EditSubCategory from '../components/stock/stock-components/EditItem'
import DamagedItem from '../components/stock/stock-components/DamagedItemList'
import AddDamagedItem from '../components/stock/stock-components/AddDamagedItem'
//import ViewDamage from '../components/stock/stock-components/ViewDamage'
import DisposedItem from '../components/stock/stock-components/DisposedItemList'
//import ViewDisposed from '../components/stock/stock-components/ViewDisposed'
//import ReleasedItem from '../components/stock/stock-components/ReleasedItem'
import AddReleasedItem from '../components/stock/stock-components/AddReleasedItem'
import AddDisposedItem from '../components/stock/stock-components/AddDisposedItem'
import ViewLowStock from '../components/stock/stock-components/ViewLowStock'
//import ViewReleasedItem from '../components/stock/stock-components/ViewReleasedItem'
//import LowStockList from '../components/stock/stock-components/LowStockList'
import GenerateReport from '../components/stock/stock-components/GenerateReport'
//import ViewReleasedItem from '../components/stock/stock-components/ViewReleasedItem'
//import LowStockList from '../components/stock/stock-components/LowStockList'
import GenerateReports from '../components/stock/stock-components/GenerateReport'

import SendEmail from '../components/stock/stock-components/SendMailForm'



import SupplierHome from './supplier/SupplierHome'
import AddNewSupplier from './supplier/supplier-components/AddNewSupplier'
import DisplayAllSuppliers from './supplier/supplier-components/DisplayAllSuppliers'
import BestSupplier from './supplier/supplier-components/BestSupplier'
import ContactSupplier from './supplier/supplier-components/ContactSupplier'
import UpdateSupplier from './supplier/supplier-components/UpdateSupplier'
import MoreDetailsSupplier from './supplier/supplier-components/MoreDetailsSupplier'
import DeliveryHome from './delivery/DeliveryHome'
import DisplayStockOrders from './purchasing/purchasing-components/DisplayStockOrders'
import DisplaySpecificStockOrder from './purchasing/purchasing-components/DisplaySpecificStockOrder'
import TestPurchasing from './purchasing/purchasing-components/TestPurchasing'
import AddOtherPurchase from './purchasing/purchasing-components/AddOtherPurchase'
import DisplayOtherPurchases from './purchasing/purchasing-components/DisplayOtherPurchases'
import UpdateOtherPurchase from './purchasing/purchasing-components/UpdateOtherPurchase'
import DisplaySpecificOtherPurchase from './purchasing/purchasing-components/DisplaySpecificOtherPurchase'
import SearchStockOrders from './purchasing/purchasing-components/SearchStockOrders'
import PurchasingGenerateReport from './purchasing/purchasing-components/GenerateReport'
import SendMails from './purchasing/purchasing-components/SendMails'
import GenerateGraph from './purchasing/purchasing-components/GenerateGraph'
import PurchasingCalculating from './purchasing/purchasing-components/PurchasingCalculating'


import ManagerManagement from './dashboard/dashboard-components/manager-management'
import Graph from './dashboard/dashboard-components/graph'
import Addcategory from './dashboard/dashboard-components/AddCategory'
import Contact from './dashboard/dashboard-components/Contact'
import ViewCategory from './dashboard/dashboard-components/ViewCategory'




import DashboardHome from "./dashboard/DashboardHome";
import OrderHome from "./order/OrderHome";
import EmployeeHome from "./employee/EmployeeHome";

import Catgraph from "./dashboard/dashboard-components/Catgraph";
import Notes from "./dashboard/dashboard-components/Notes";



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
            <Route path="/purchasing/generate-report" element={<PurchasingGenerateReport/>}/>
            <Route path="/purchasing/data-analysis" element={<GenerateGraph/>}/>
            <Route path="/purchasing/send-mails" element={<SendMails/>}/>
            <Route path="/purchasing/calc" element={<PurchasingCalculating/>}/>


            <Route path="/dashboard-home" element={<DashboardHome/>}/>
            <Route path="/dashboard-home/manager" element={<ManagerManagement/>}/>
            <Route path="/dashboard-home/Category" element={<Addcategory/>}/>
            <Route path="/dashboard-home/graph" element={<Graph/>}/>
            <Route path="/dashboard-home/contact" element={<Contact/>}/>
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
            <Route path="/financial/SendMail" element={<FinancialSendEmail/>}/>
            <Route path="/financial/ReportGenerate" element={<FinancialReportGenerate/>}/>
            <Route path="/employee-home" element={<EmployeeHome/>}/>

            {/*stock*/}
            <Route path="/stock/stock-home" element={<SubCategory/>}/>
            <Route path="/stock/sub-category" element={<SubCategory/>}/>
            <Route path="/stock/item-view/:id" element={<ItemView/>}/>
            <Route path="/stock/add-item" element={<AddItem/>}/>
            <Route path="/stock/damaged-item" element={<DamagedItem/>}/>
            <Route path="/stock/add-damaged-item" element={<AddDamagedItem/>}/>
            {/*<Route path="/stock/view-damaged-item/:id" element={<ViewDamage/>}/>*/}
            <Route path="/stock/disposed-item" element={<DisposedItem/>}/>
            {/*<Route path="/stock/view-disposed-item/:id" element={<ViewDisposed/>}/>*/}
            {/*<Route path="/stock/released-item" element={<ReleasedItem/>}/>*/}
            <Route path="/stock/add-released-item" element={<AddReleasedItem/>}/>
            <Route path="/stock/edit-sub-item/:id"element={<EditSubCategory/>}/>
            <Route path="/stock/add-disposed-item" element={<AddDisposedItem/>}/>
            <Route path="/stock/view-lowstock-item" element={<ViewLowStock/>}/>
            {/*<Route path="/stock/view-released-item/:id" element={<ViewReleasedItem/>}/>
            <Route path="/stock/view-lowstock-item" element={<LowStockList/>}/>*/}
            <Route path="/stock/generate-report" element={<GenerateReport/>}/>
            
            {/*<Route path="/stock/view-released-item/:id" element={<ViewReleasedItem/>}/>
            <Route path="/stock/view-lowstock-item" element={<LowStockList/>}/>*/}
            <Route path="/stock/generate-report" element={<GenerateReports/>}/>
            
            <Route path="/stock/mail" element={<SendEmail/>}/>
            

         


            <Route path="/employee/add-employee" element={<AddEmployeeDetails/>}/>
            <Route path="/employee/DisplayAllEmployeeDetails" element={<DisplayAllEmployeeDetails/>}/>
            <Route path="/employee/employee-leave" element={<EmployeeLeave/>}/>
            <Route path="/employee/update-employee/:id" element={<UpdateEmployee/>}/>
            <Route path="/employee/employee-mails" element={<EmployeeMails/>}/>
            <Route path="/employee/employee-Attendance" element={<EmployeeAttendance/>}/>
            <Route path="/stock-home" element={<StockHome/>}/>
            <Route path="/supplier/supplier-home" element={<SupplierHome/>}/>
            <Route path="/supplier/AddNewSupplier" element={<AddNewSupplier/>}/>
            <Route path="/supplier/DisplayAllSuppliers" element={<DisplayAllSuppliers/>}/>
            <Route path="/supplier/BestSupplier" element={<BestSupplier/>}/>
            <Route path="/supplier/ContactSupplier" element={<ContactSupplier/>}/>
            <Route path="/supplier/UpdateSupplier/:id" element={<UpdateSupplier/>}/>
            <Route path="/supplier/MoreDetailsSupplier/:id" element={<MoreDetailsSupplier/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
            <Route path='/ViewCategory' element={<ViewCategory/>} />
          <Route path="/" element={<Home />} />
          <Route
            path="/purchasing/purchasing-home"
            element={<PurchasingHome />}
          />
          <Route path="/purchasing/place-order" element={<PlaceStockOrder />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route
            path="/dashboard-home/manager"
            element={<ManagerManagement />}
          />
          <Route path="/dashboard-home/Category" element={<Addcategory />} />
          <Route path="/dashboard-home/graph" element={<Graph />} />
          <Route path="/dashboard-home/contact" element={<Contact />} />
          <Route path="/dashboard-home/Catgraph" element={<Catgraph />} />
          <Route path="/dashboard-home/Notes" element={<Notes />} />
          <Route path="/order-home" element={<OrderHome />} />
          <Route path="/financial-home" element={<FinancialHome />} />
          <Route path="/employee-home" element={<EmployeeHome />} />
          <Route path="/stock-home" element={<StockHome />} />
          <Route path="/supplier-home" element={<SupplierHome />} />
          <Route path="/delivery-home" element={<DeliveryHome />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
