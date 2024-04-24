import App from './App.jsx';
import ReactDOM from "react-dom/client"
import { useReducer, createContext } from 'react';
import { is, reducer } from './reducer';

export const myContext = createContext();

const Start = () => {
  const [state, dispatch] = useReducer(reducer, is);
  return (
    <myContext.Provider value={{ state, dispatch }}>
      <App />
    </myContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(<Start />);

