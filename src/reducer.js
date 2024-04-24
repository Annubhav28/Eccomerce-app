import axios from "axios";
const is = {
  product: [],
  FilteredItem: [],
  Cart: [],
};

const reducer = (state, action) => {
  // console.log(state,action);
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


    default:
      return { ...state };
  }
};

export { reducer, is };
