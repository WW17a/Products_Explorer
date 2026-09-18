import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute /> }>
        <Route path='/products' element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
