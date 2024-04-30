import { useContext,useEffect,useState} from 'react'
import {myContext} from "./App"
import { MockApi } from './Mockapi';
import axios from "axios"
import { getAuth,onAuthStateChanged } from 'firebase/auth';


const Cart=()=> {
  const[cart,setCart]=useState([])
  const[quantity,setquantity]=useState(1)
  const{state,dispatch}=useContext(myContext);
  const[avail,setAvail]=useState(null);
  // console.log(avail)



  
// console.log(state);

  const cartShow=async()=>{
    if(avail !== null){
        const res = await axios.get(`https://662742a7b625bf088c07cc38.mockapi.io/Cart?Email=${avail}`);
        const newData = res.data;

        const cartData = await Promise.all(newData.map(async (item) => {
          const product = await axios.get(`https://dummyjson.com/products/${item.proid}`);
          return { ...product.data, Cartid: item.id };
        }));
  
        setCart(cartData); 
  }
}

  // console.log(cart)


// console.log(total);

// console.log(cart)


  useEffect(()=>{
    const userName = async()=>{
      const auth = getAuth();
auth.onAuthStateChanged((user)=>{
  if(user){
    setAvail(user.email)
  }
  else{
    setAvail(null)
  }
})
    }
    cartShow();
    userName();
    return userName;
  },[avail])
 

// console.log(cart)
 

  const handleInc=()=>{
    if(quantity >=1){
      setquantity(quantity+1)
    }
  }

  const handleDec=()=>{
    if(quantity>1){
      setquantity(quantity-1)
    }
  }

  const handleDelete =async(id)=>{
    const show = await axios.delete(`https://662742a7b625bf088c07cc38.mockapi.io/Cart/${id}`);
    
   

  }



  // console.log(state.Cart);

  return (
  <>
 <div className="container">
  <div className="row column">
    <div className="col-7 col-ml-12 col-mp-12">
    <div className="shopping-cart">
      <div className="shop-head">
        <h3>Shopping Cart</h3>
        <span>Item {cart.length}</span>
      </div>
{
  cart.map((item,i)=>{
    return(
      <div className="cart-item" key={i}>
      <div className="row align-center">
       <div className="col-8 col-ip-4 col-ml-4 col-mp-4">
         <div className="image-cart">
           <img loading='lazy' src={item.thumbnail} alt={item.title} height="20" width="30" />
           <div className="title">{item.title}</div>
         </div>
       </div>
       <div className="col-2 col-ip-4 col-ml-4 col-mp-4">
         <div className="btn"><button onClick={handleDec}>-</button><span className="qua">{quantity}</span><button onClick={handleInc}>+</button></div>
       </div>
       <div className="col-2 col-ip-4 col-ml-4 col-mp-4">
         <div className="price">
           <span>$ {item.price}</span>
           <button onClick={()=>handleDelete(item.Cartid)} className='remove'>X</button>
         </div>
       </div>
      </div>
     </div>
    )
  })
}
    </div>
    <div className="col-5"></div>
    <div className="col-3">
       <div className="total">
     {/* <span className='totalprice'>Total:<span className="price">{total}.00$</span></span> */}
    </div>
       </div>
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
