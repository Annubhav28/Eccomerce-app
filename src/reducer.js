import axios from "axios";
import { useId } from "react";
const is = {
  product: [],
  FilteredItem: [],
  Cart: [],
  Email:""
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "PRODUCTS":
      return { ...state, product: action.payload,FilteredItem:action.payload };

   

    case "Filtered":
      const category = action.payload;
      const FilteredItem =
        category === "All"
          ? state.product
          : state.product.filter((item) => item.category === category);
      return { ...state, FilteredItem };

    case "AddCart":
 
      const product = action.payload;
      const itemAvail = state.Cart.find((item) => item.id === product.id);
      
     if(itemAvail) {
      return state
     }
     else{
      return {
        ...state,Cart:[...state.Cart,product]
      }
     }

     case "Removecart" : const rec = action.payload
     const prod = state.Cart.filter((item)=>item.id !== rec.id);
     return {
      ...state,Cart:prod
     }

     case "Email" : 
    //  console.log(action.payload)
     return {...state,Email:action.payload};


    default:
      return { ...state };
  }
};

export { reducer, is };
