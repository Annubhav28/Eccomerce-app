import axios from "axios";
import { useId } from "react";
const is = {
  product: [],
  FilteredItem: [],
  Cart: [],
};

const reducer = (state, action) => {
  // console.log(state);
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
    // console.log(action.payload)
    
    return {...state,Cart:action.payload};
    case "Reset" : return {...state,Cart:[]}

  


    default:
      return { ...state };
  }
};

export { reducer, is };
