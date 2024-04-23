import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { useReducer,createContext } from 'react'
import { reducer,is } from './reducer'


export const myContext = createContext();
const AppContainer = () => {
  const [state, dispatch] = useReducer(reducer, is);
  return (
    <myContext.Provider value={{ state, dispatch }}>
      <App />
    </myContext.Provider>
  );
};
const Root = createRoot(document.getElementById('root'));
Root.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>
);