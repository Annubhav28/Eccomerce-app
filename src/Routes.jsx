import React from 'react'
import Navbar from './navbar'
import Home from './Home'
import Category from './Category'
import ProductsDetail from './ProductsDetail'
import Cart from './Cart'
import Error from './error'
import Signup from './Signup'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { useState,useEffect,useCallback } from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import Firebase from "./Firebase"

const RoutersFile=()=>{
const [user,setUser]=useState(null);


  const userName = useCallback(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    userName();
   
    return () => userName();
  }, [userName,]);


  return (
   <>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Signup />} />
          <Route path="/Category" element={user ? <Category /> : <Signup />} />
          <Route path="/Products/:id" element={user ? <ProductsDetail /> : <Signup />} />
          <Route path="/Cart" element={user ? <Cart /> : <Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default RoutersFile
