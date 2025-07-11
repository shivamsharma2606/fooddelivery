import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/list/list'
import Orders from './pages/orders/orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
  

const App = () => {
  const url = "https://fooddelivery-6oee.onrender.com"; 
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="app-component">
        <Sidebar/>
        <Routes>
          <Route path='/Add' element={<Add url = {url}/>}/>
          <Route path='/list' element={<List url = {url}/>}/>
          <Route path='/orders' element={<Orders url = {url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
