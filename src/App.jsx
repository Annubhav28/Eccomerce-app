import { Route,Routes } from 'react-router-dom';
import './App.css'
import {  useEffect,useCallback, useContext, useState } from 'react';
import { myContext } from './main';
import firebase from "./Firebase"
import { onAuthStateChanged } from 'firebase/auth/web-extension';
import { getAuth } from 'firebase/auth';
import { lazy,Suspense } from 'react';
import { fetchData } from './api';



const Home = lazy(()=>import("./Home"))
const Navbar = lazy(()=>import("./navbar"))
const Signup = lazy(()=>import("./Signup"))
const ProductsDetail = lazy(()=>import("./ProductsDetail"))
const Cart = lazy(()=>import("./Cart"))
const Category = lazy(()=>import("./Category"))
const Error = lazy(()=>import("./error"))

const App=()=>{
  const[user,setUser]=useState(null);
const{dispatch}=useContext(myContext)
 const newdata=useCallback(async()=>{
  const data = await fetchData();
  dispatch({type:"PRODUCTS",payload:data})
  // console.log(res.data)
 },[dispatch])


 const userName=async()=>{
 const auth =getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user)
      // ...
    } else {
     setUser(null)
    }
  });
 }

useEffect(()=>{
  userName()
newdata()
return () => userName();
},[])


// console.log(state.Cart)
  return (
    <>


<Navbar/>
<Suspense fallback={<div>Loading...</div>}>
<Routes>
<Route path='/' element={user ? <Home/> : <Signup/>}/>
<Route path='/Category' element={ user ?  <Category/> : <Signup/>}/>
<Route path='/Products/:id' element={user ? <ProductsDetail/> : <Signup/>}/>
<Route path='/Cart' element={user ?  <Cart /> : <Signup/>}/>
<Route path="/Signup" element={<Signup />}/>
<Route path="*" element={<Error/>}/>
     </Routes>
</Suspense>
    </>
  )
}

export default App
