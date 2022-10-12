import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Login from "./pages/Login"
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
      <ToastContainer />
    </div>
  )

}

export default App;
