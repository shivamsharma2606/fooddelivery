import React, { useState } from 'react';
import Navbar from './components/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import PlaceOrder from './pages/placeorder/placeorder'
import Footer from './components/footer/footer';
import Appdownload from './components/AppDownload/Appdownload';
import Loginpopup from './components/Loginpopup/LoginPopup';
import Verify from './pages/verify/verify';
import MyOrder from './pages/MyOrders/MyOrder';
 



const App = () => {

 const [showLoign,setShowLogin]=useState(false) 
  return (
    <>
    {showLoign?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} /> 
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Cart' element={<Cart/>} />
          <Route path='/Order' element={<PlaceOrder/>} />
          <Route path='/Verify' element={<Verify/>} />
          <Route path='/Myorders' element={<MyOrder/>} />
        </Routes>
      </div>
      <Appdownload/>
            <Footer />
    </>
  );
};

export default App;
