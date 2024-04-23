import React, { useContext, useState,useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { myContext } from "./main";
import { lazy } from "react";
import Slider from "react-slick";


const ProductsDetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };




  const { id } = useParams();
  const{state,dispatch}=useContext(myContext);

  const [data, setData] = useState();

  const newData = useCallback(async()=>{
    const details = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    setData(details.data);
  },[id])
  

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
                  <button onClick={()=>dispatch({type:"AddCart",payload:data})}>Add to Cart</button>
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
