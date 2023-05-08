import React from 'react'
import './Products.css'
import ProductItem from './ProductItem';

const Products = (props) => {
  return (
    <div className="container">

      <h2 className="products-main-title">{props.title}</h2>
      <div className="product-items-parent products-list">
          {/* <ProductItem num={0} productArrayItem = {props.productsArray[0]}/> */}
       {props.productsArray.map((product)=>{
         return (
           
         <ProductItem productArrayItem = {product}/>
         )
       })}

{/* 
          <h1>{props.productsArray[0].productTitle }</h1>
          <h1>{props.productsArray[1].productTitle }</h1>
          <h1>{props.productsArray[2].productTitle }</h1>
          <h1>{props.productsArray[3].productTitle }</h1>
          <img src={props.productsArray[0].productImage} alt="" />
           */}
          

      </div>
    </div>
  )
}

export default Products
