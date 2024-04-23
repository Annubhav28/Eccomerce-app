import { useContext,useEffect,useState} from 'react'
import {myContext} from "./main"
import { MockApi } from './Mockapi';
import axios from "axios"


const Cart=()=> {
  const[cart,setCart]=useState([])
  const{state,dispatch}=useContext(myContext);


  const cartShow=async()=>{
    const res = await axios.get(MockApi);
const newData= res.data;
setCart(newData)
  }



// console.log(cart)


  useEffect(()=>{
    cartShow();
  },[])


  const handleDelete=async(i)=>{
const res = await axios.delete(`https://662742a7b625bf088c07cc38.mockapi.io/Cart/${i}`)
setCart(cart.filter((item)=>item.id !== i))
  }



  // console.log(state.Cart);

  return (
  <>
 <div className="container">
  <div className="row">
    <div className="col-7">
    <div className="shopping-cart">
      <div className="shop-head">
        <h3>Shopping Cart</h3>
        <span>Item {cart.length}</span>
      </div>
{
  cart.map((item)=>{
    return(
      <div className="cart-item" key={item.id}>
      <div className="row align-center">
       <div className="col-8">
         <div className="image-cart">
           <img loading='lazy' src={item.images[0]} alt={item.title} />
           <div className="title">{item.title}</div>
         </div>
       </div>
       <div className="col-2">
         <div className="btn"><button>-</button><span className="qua">1</span><button>+</button></div>
       </div>
       <div className="col-2">
         <div className="price">
           <span>$ {item.price}</span>
           <button onClick={()=>handleDelete(item.id)} className='remove'>X</button>
         </div>
       </div>
      </div>
     </div>
    )
  })
}

    </div>
    <div className="col-5"></div>
   </div>
  </div>
</div>



  {/* <div className="Shopping_Cart">
  <div className="container">
    <div className="row">
      <div className="col-6">
        <div className="shop_head">
          <h5>Shopping Cart</h5>
          <p>Items 5</p>
        </div>
      </div>
      <div className="col-6"></div>
    </div>
    <div className="full-card">
    <div className="row">
      <div className="col-6">
<div className="shop-card">
<div className="row align-center">
  <div className="col-4">
    <div className="cart-image">
<img src="" alt="" />
<p>Title</p>
    </div>
  </div>
  <div className="col-4">
    <div className="quantity">
      <button>-</button><p>1</p><button>+</button>
    </div>
  </div>
  <div className="col-4">
    <div className="price">
      <p>Price</p>
    </div>
  </div>
</div>
</div>
      </div>
      <div className="col-6"></div>
      
   
    </div>
    </div>
  </div>
  </div> */}
  </>
  )
}

export default Cart
