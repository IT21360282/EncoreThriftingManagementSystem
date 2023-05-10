import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PurchasingHome from "./purchasing/PurchasingHome";
import PlaceStockOrder from "./purchasing/purchasing-components/PlaceStockOrder";
import DashboardHome from "./dashboard/DashboardHome";
import OrderHome from "./order/OrderHome";
import EmployeeHome from "./employee/EmployeeHome";
import FinancialHome from "./financial/FinancialHome";
import StockHome from "./stock/StockHome";
import SupplierHome from "./supplier/SupplierHome";
import DeliveryHome from "./delivery/DeliveryHome";
import ManagerManagement from "./dashboard/dashboard-components/manager-management";
import Graph from "./dashboard/dashboard-components/graph";
import Addcategory from "./dashboard/dashboard-components/AddCategory";
import Contact from "./dashboard/dashboard-components/Contact";
import Catgraph from "./dashboard/dashboard-components/Catgraph";
import Notes from "./dashboard/dashboard-components/Notes";

export default class Body extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
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
