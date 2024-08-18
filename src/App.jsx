import { useState,useEffect} from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom"
import axios from 'axios';

import { useAuth } from './context/AuthContext';
import { useDispatch } from 'react-redux';

import {Toaster} from "react-hot-toast"
import Home from './components/Home/Home.component.jsx';
import LoginForm from './components/Login/LoginFormcomponent.jsx';
import RegisterForm from './components/Register/RegisterFormcomponent.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import UnAuthorized from './components/UnAuthorized.jsx';
import NavBar from './components/Navbar/NavBar.jsx';
import Cart from './components/Cart/Cart.component.jsx';
import Checkout from './components/Checkout/Checkout.component.jsx';
import { startGetProducts } from './actions/productsAction.js';
import { startGetMyCart } from './actions/cartAction.js';
import {ACCOUNT} from './apis/api.js';

function App() {
  
  const dispatch = useDispatch()

  const { user, handleLogin } = useAuth()

  useEffect(() => {
    if(localStorage.getItem("token")) {
        (async () => {
            const response = await axios.get(ACCOUNT {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            handleLogin(response.data)
        }) ()
    }
}, [])

useEffect(()=>{
  if(localStorage.getItem("token")){
    dispatch(startGetMyCart())
  }
  
},[])
useEffect(()=>{
  dispatch(startGetProducts())
},[])
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>

      </Routes>
      <Toaster/>
     
    </>
  )
}

export default App
