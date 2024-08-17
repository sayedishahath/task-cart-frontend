import { useState,useEffect} from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom"
import axios from 'axios';

import { useAuth } from './context/AuthContext';
import { useDispatch } from 'react-redux';

import Home from './components/Home/Home.component.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import UnAuthorized from './components/UnAuthorized.jsx';
import NavBar from './components/Navbar/NavBar.jsx';
import Cart from './components/Cart/Cart.component.jsx';

function App() {
  
  const dispatch = useDispatch()

  const { user, handleLogin } = useAuth()

  useEffect(() => {
    if(localStorage.getItem("token")) {
        (async () => {
            const response = await axios.get("http://localhost:5001/api/users/account", {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            handleLogin(response.data)
        }) ()
    }
}, [])
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App
