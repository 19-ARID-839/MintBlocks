import React from 'react'
import './ProductItem.css'
import { AiOutlineLike } from 'react-icons/ai';
// import Products from './Products';

// let repeatProducts = ()=>{
//     for(let i=0;i<10;i++){

//     }
// }
// repeatProducts();
const ProductItem = (props) => {
  return (
      <>
      

      {/* className="product-items-parent" */}
<div >


<div className="product-item">
  <img src={props.productArrayItem.productImage} height="250px"alt="" />
  <h4>{props.productArrayItem.productTitle }</h4>
  <div className="pi-paras">
  <p>${props.productArrayItem.productPrice }</p>
  <p>Publisher <b><i>@{props.productArrayItem.productUser}</i></b></p>
  </div>
  <p>{props.productArrayItem.productDescription}</p>
  <div className="pi-btns">
  <button className="btn btn-success pi-btns-p">Buy Now </button>
  <button className="btn btn-primary pi-btns-p">{props.productArrayItem.productLikes}<AiOutlineLike/> </button>
  </div>
  </div>
  

  

          {/* <h1></h1>
          <h1>{props.productArrayItem[1].productTitle }</h1>
          <h1>{props.productArrayItem[2].productTitle }</h1>
          <h1>{props.productArrayItem[3].productTitle }</h1>
          <img src={props.productArrayItem[0].productImage} alt="" /> */}
          

{/*           
  <h1>{props.productArrayItem[0].productTitle}</h1>
  <h1>{props.num}</h1> */}



</div>
    </>
  )
}

export default ProductItem
