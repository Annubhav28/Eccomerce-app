
import { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import {myContext} from "./main"
import Slider from "react-slick";

import { useNavigate } from 'react-router-dom';


const newArrival=()=>{

  var settings = {
    infinite: true,
    dots:true,
    speed: 500,
    slidesToShow: 3,
    lazyload: true,
    slidesToScroll: 1,
    
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
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
   const nav= useNavigate();
  const[data,setData]=useState([])
  const{state,dispatch}=useContext(myContext);




  const showProduct=useCallback(()=>{
    const prod = state.product.filter(item=>item.category.name === "Furniture");
setData(prod);
  },[state.product])
 

  useEffect(()=>{
    showProduct();
  },[state]);


const handleChange=(i)=>{
nav(`./Products/${i}`)
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
          <img loading='lazy' src={pro.images} alt={pro.title} />
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

  