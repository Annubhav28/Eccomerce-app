import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useCallback, useContext, useState } from 'react';
import Home from './Home';
import Signup from './Signup';
import ProductsDetail from './ProductsDetail';
import Cart from './Cart';
import Category from './Category';
import Error from './error';
import { myContext } from './main';
import { BrowserRouter } from 'react-router-dom';
import firebase from './Firebase';
import { onAuthStateChanged } from 'firebase/auth/web-extension';
import { getAuth } from 'firebase/auth';
import { fetchData } from './api';

const App = () => {
  const [user, setUser] = useState(null);
  const { dispatch } = useContext(myContext);

  const newdata = useCallback(async () => {
    const data = await fetchData();

    dispatch({ type: 'PRODUCTS', payload: data.products });
  }, [dispatch]);

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
    newdata();
    return () => userName();
  }, [userName, newdata]);

  return (
    <>
      <BrowserRouter>
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
  );
};

export default App;
