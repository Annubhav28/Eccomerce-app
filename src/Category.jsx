import { useContext } from "react";
import { myContext } from "./App";
import { useNavigate } from "react-router-dom";
import { MockApi,} from "./Mockapi";
import axios from "axios";


const Category=()=>{
// const[itemAdded,setItem]=useState("");
const{state,dispatch}=useContext(myContext);

 


const nav=useNavigate();
const handleId=(i)=>{
    nav(`/Products/${i}`);
}


const handleCart=async(i)=>{
        dispatch({type:"AddCart",payload:i});
        const res =await axios.get("https://662742a7b625bf088c07cc38.mockapi.io/Cart")
        const data = res.data;
        // console.log(data)
        const itemExist = data.find((item)=>item.title === i.title)
        if(!itemExist){ 
           await axios.post("https://662742a7b625bf088c07cc38.mockapi.io/Cart",i)
        }
    }




// console.log(itemAdded)
// console.log(state.FilteredItem)
// console.log(state.Cart)

  return(
    <>
      <div className="category">
<div className="container">
    <div className="row">
        <div className="col-5 col-mp-12">
            <h2>Our products</h2>
        </div>
        <div className="col-7"></div>
          <div className="col-12">
            <div className="items">
                <button onClick={()=>dispatch({type:"Filtered",payload:"All"})}>All</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"smartphones"})}>Smartphone</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"laptops"})}>Laptops</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"groceries"})}>Groceries</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"fragrances"})}>Fragrances</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"home-decoration"})}>Home Decor</button>
                <button onClick={()=>dispatch({type:"Filtered",payload:"skincare"})}>Skin Care</button>
               
            </div>
          </div>
        </div>
        <div className="row">
        
        {
            state.FilteredItem.map((item,i)=>{
                return(
                    <div key={i} className="col-3 col-ml-4 col-mp-6">
            <div className="card-content">
                <div className="img" onClick={()=>handleId(item.id)}>
                    <img loading="lazy" src={item.images[0]} height="250" width="250" alt="" />
                </div>
                <div className="card-text">
                    <h3>{item.title}</h3>
                    <div className="price">
                        <p>${item.price}</p>
                       
                    </div>
{/* {
    itemAdded === item.id? <button>Go to Cart</button> : <button onClick={()=>handleCart(item)}>Add to Cart</button> 
} */}
                    <button onClick={()=>handleCart(item)}>Add to Cart</button>
                   

                </div>
            </div>
           </div>
                )
            })
        }


        </div>
    </div>
</div>

    </>
  )
}
export default Category;