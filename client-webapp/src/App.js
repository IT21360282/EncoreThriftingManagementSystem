import React from "react";
import Home from "./pages/Home/Home";
import Booksview from './pages/Books/BooksView'
import ClothesView from './pages/Clothes/ClothesView'
import EitemsView from './pages/Eitems/EitemsView'
import FurnitureView from './pages/Furniture/FurnitureView'
import GiftsView from './pages/Gifts/GiftsView'
import ToolsView from './pages/Tools/ToolsView'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from "./pages/Profile/CustomerProfile/MyProfile";
import EditProfile from "./pages/Profile/CustomerProfile/EditProfile";
import Cart from './pages/Profile/Cart/Cart'
import MyReturns from "./pages/Profile/TrackOrders/MyReturns";
import TrackOrders from './pages/Profile/TrackOrders/TrackOrders'
import MyReview from "./pages/Profile/Reviews/MyReview";
import AddReview from "./pages/Profile/Reviews/AddReview";
import EditReviews from "./pages/Profile/Reviews/EditReviews";
import Signin from './pages/Login/LoginPage'
import SignUp from "./pages/SignUp/SignUpPage";
import ItemViewpage from "./pages/ItemView/ItemViewpage";
import PaymentPhase01 from "./pages/Payment/PaymentPhase01";
import PaymentPhase02 from "./pages/Payment/PaymentPhase02";
import AboutUs from "./pages/AboutUs/AboutUs";
import QandA from "./pages/QandA/QandA";
import CustomerCare from "./pages/CustomerCare/CustomerCare";
import Pay01 from "./components/Pay/Pay01";
// import ItemView from "./components/ItemView/ItemView";



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/BooksView" element={<Booksview/>} />
          <Route path="/ClothesView" element={<ClothesView/>} />
          <Route path="/EitemsView" element={<EitemsView/>} />
          <Route path="/FurnitureView" element={<FurnitureView/>} />
          <Route path="/GiftsView" element={<GiftsView/>} />
          <Route path="/ToolsView" element={<ToolsView/>} />
          <Route path="/MyProfile" element={<MyProfile/>} />
          <Route path="/EditProfile" element={<EditProfile/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/MyReturns" element={<MyReturns/>} />
          <Route path="/MyOrders" element={<TrackOrders/>} />
          <Route path="/MyReviews" element={<MyReview/>} />
          <Route path="/AddReview" element={<AddReview/>} />
          <Route path="/EditReview" element={<EditReviews/>} />
          <Route path="/Signin" element={<Signin/>} />
          <Route path="/Signin" element={isLoggedIn==="true" ? <Home/> : <Signin />} />
          <Route path="/Signup" element={<SignUp/>} />
          <Route path="/ItemView/:id" element={<ItemViewpage/>} />
          <Route path="/PaymentPhase01/:id" element={<PaymentPhase01/>} />
          <Route path="/PaymentPhase02" element={<PaymentPhase02/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/QandA" element={<QandA/>} />
          <Route path="/CustomerCare" element={<CustomerCare/>} />
          <Route path="/ItemView/:itemId" element={<ItemViewpage/>} />
        </Routes>
      </Router>
    </div>
  );
}

//if error comes change the ItemView to ItemViewPage

export default App;
