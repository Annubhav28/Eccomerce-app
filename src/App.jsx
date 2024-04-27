import './App.css';
import { useEffect, useCallback,useReducer} from 'react';
import { fetchData } from './api';
import RoutersFile from './Routes';
import {reducer,is} from "./reducer"
import { createContext } from 'react';


export const myContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, is);
 


  const newdata =async () => {
    
    const data = await fetchData();
    dispatch({ type: 'PRODUCTS', payload: data.products });
  };

 

  useEffect(() => {
    newdata();
  }, []);

  return (
    <>
<myContext.Provider value={{state,dispatch}}>
<RoutersFile />
</myContext.Provider>
    </>
  );
};

export default App;
