import React, { Component } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Home'
import PurchasingHome from './purchasing/PurchasingHome'
import PlaceStockOrder from './purchasing/purchasing-components/PlaceStockOrder'
import DashboardHome from './dashboard/DashboardHome'
import OrderHome from './order/OrderHome'
import EmployeeHome from './employee/EmployeeHome'
import FinancialHome from './financial/FinancialHome'

//stock
import StockHome from './stock/StockHome'
import SubCategory from '../components/stock/stock-components/SubCategory'
import ItemView from '../components/stock/stock-components/ItemViewPage'
import AddItem from '../components/stock/stock-components/AddItem'
import EditSubCategory from '../components/stock/stock-components/EditItem'
import DamagedItem from '../components/stock/stock-components/DamagedItemList'
import AddDamagedItem from '../components/stock/stock-components/AddDamagedItem'
import ViewDamage from '../components/stock/stock-components/ViewDamage'
import DisposedItem from '../components/stock/stock-components/DisposedItemList'
import ViewDisposed from '../components/stock/stock-components/ViewDisposed'
import ReleasedItem from '../components/stock/stock-components/ReleasedItem'
import AddReleasedItem from '../components/stock/stock-components/AddReleasedItem'
import AddDisposedItem from '../components/stock/stock-components/AddDisposedItem'
import ViewLowStock from '../components/stock/stock-components/ViewLowStock'
import ViewReleasedItem from '../components/stock/stock-components/ViewReleasedItem'
import LowStockList from '../components/stock/stock-components/LowStockList'
import GenerateReports from '../components/stock/stock-components/GenerateReport'

import SendEmail from '../components/stock/stock-components/SendMailForm'



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

            {/*stock*/}
            <Route path="/stock/stock-home" element={<StockHome/>}/>
            <Route path="/stock/sub-category" element={<SubCategory/>}/>
            <Route path="/stock/item-view/:id" element={<ItemView/>}/>
            <Route path="/stock/add-item" element={<AddItem/>}/>
            <Route path="/stock/damaged-item" element={<DamagedItem/>}/>
            <Route path="/stock/add-damaged-item" element={<AddDamagedItem/>}/>
            <Route path="/stock/view-damaged-item/:id" element={<ViewDamage/>}/>
            <Route path="/stock/disposed-item" element={<DisposedItem/>}/>
            <Route path="/stock/view-disposed-item/:id" element={<ViewDisposed/>}/>
            <Route path="/stock/released-item" element={<ReleasedItem/>}/>
            <Route path="/stock/add-released-item" element={<AddReleasedItem/>}/>
            <Route path="/stock/edit-sub-item/:id"element={<EditSubCategory/>}/>
            <Route path="/stock/add-disposed-item" element={<AddDisposedItem/>}/>
            <Route path="/stock/view-lowstock-item" element={<ViewLowStock/>}/>
            <Route path="/stock/view-released-item/:id" element={<ViewReleasedItem/>}/>
            <Route path="/stock/view-lowstock-item" element={<LowStockList/>}/>
            <Route path="/stock/generate-report" element={<GenerateReports/>}/>
            
            <Route path="/stock/mail" element={<SendEmail/>}/>
            



            <Route path="/supplier-home" element={<SupplierHome/>}/>
            <Route path="/delivery-home" element={<DeliveryHome/>}/>
        </Routes>
    </BrowserRouter>
    )
  }
}
