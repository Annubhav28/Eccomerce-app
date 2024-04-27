
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import {myContext} from "./App"
import Slider from "react-slick";

import { useNavigate } from 'react-router-dom';


const newArrival=()=>{
   const nav= useNavigate();
  const[data,setData]=useState([])
  const {state}  = useContext(myContext);
  // console.log(state)



  const showProduct=useCallback(()=>{
    const prod = state.product.filter(item=>item.category === "home-decoration");
setData(prod);
  },[state.product])
 

  useEffect(()=>{
    showProduct();
  },[state]);


const handleChange=(i)=>{
nav(`./Products/${i}`)
};




var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
 

return(

  
  <>


<div className="slider">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="arritext">
        <h3>New Arrivals</h3>
        </div>
      </div>
      </div>
      <Slider  {...settings}>


{
   data.map((pro,i)=>{
    return(
      <div className='slide' key={i}>
      <div className="arrival-card" onClick={()=>handleChange(pro.id)}>
        <div className="img">
          <img loading='lazy' src={pro.images[2]} alt={pro.title} height="400" width="400" />
        </div>
        <div className="text-arri">
          <div className="title">
            <p>{pro.title}</p>
            <p>Explore</p>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>
      </div>
    )
  })
  
}
  </Slider>
      </div>
      </div>

      </>
)}

      
      export default newArrival;

  