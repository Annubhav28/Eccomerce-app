import React, { useContext, useState,useEffect, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { myContext } from "./App";
import { lazy } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";


const ProductsDetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


const nav = useNavigate();

  const { id } = useParams();
  const{state,dispatch}=useContext(myContext);

  const [data, setData] = useState();

  const newData = useCallback(async()=>{
    const details = await axios.get(
      `https://dummyjson.com/products/${id}`
    );
    setData(details.data);
  },[id])
  

  const handleCart=async(i)=>{
    dispatch({type:"AddCart",payload:i});
    const res =await axios.get("https://662742a7b625bf088c07cc38.mockapi.io/Cart")
    const data = res.data;
    console.log(data)
    const itemExist = data.find((item)=>item.title === i.title)
    if(!itemExist){ 
       await axios.post("https://662742a7b625bf088c07cc38.mockapi.io/Cart",i)
    }
}
  // console.log(data);

  useEffect(() => {
    newData();
  }, [newData]);


  // console.log(state.Cart);

  return (
    <>
      {data ? (
        <div className="productDetail">
          <div className="container">
            <div className="row">
              <div className="col-5 col-ml-12">
                <div className="product_image">
                  <Slider {...settings}>
                    {data.images.map((item, i) => {
                      return (
                        <div key={i}>
                          <img loading="lazy" src={item} alt={data.title}></img>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col-7 col-ml-12">
                <div className="product_details">
                  <div className="product_title">
                    <h4>{data.title}</h4>
                  </div>
                  <div className="product_desc">
                    <p>{data.description}</p>
                  </div>
                  <div className="product_price">
                    <p>$ {data.price}.00</p>
                  </div>
                  <button onClick={()=>handleCart(data)}>Add to Cart</button>
                  <button onClick={()=>nav("/Cart")}>Go to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductsDetail;
