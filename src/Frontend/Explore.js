import React from 'react'
import Products from '../MyComponents/Products.js'

const Explore = () => {
    var productsArrayApp = [
      { productTitle: 'White Bored Ape', productPrice: 100, productImage: 'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31', productUser: 'kashif', productLikes: '10', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'Golden Bored Ape', productPrice: 100, productImage: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg', productUser: 'kashif', productLikes: '2', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'Black Bored Ape', productPrice: 100, productImage: 'https://i.pinimg.com/736x/d8/a7/06/d8a706b3ecef2b46ce339cd1957b1d59.jpg', productUser: 'kashif', productLikes: '10', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'VR Bored Ape', productPrice: 100, productImage: 'https://img.freepik.com/premium-vector/hand-drawn-monkey-ape-vr-box-virtual-nft-style_361671-246.jpg?w=2000', productUser: 'kashif', productLikes: '1',productDescription: "This is the description of the Mint Blocks NFTs" },
      { productTitle: 'White Bored Ape', productPrice: 100, productImage: 'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31', productUser: 'kashif', productLikes: '8',productDescription: "This is the description of the Mint Blocks NFTs" },
      { productTitle: 'Golden Bored Ape', productPrice: 100, productImage: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg', productUser: 'kashif', productLikes: '4', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'Black Bored Ape', productPrice: 100, productImage: 'https://i.pinimg.com/736x/d8/a7/06/d8a706b3ecef2b46ce339cd1957b1d59.jpg', productUser: 'kashif', productLikes: '10',productDescription: "This is the description of the Mint Blocks NFTs" },
      { productTitle: 'VR Bored Ape', productPrice: 100, productImage: 'https://img.freepik.com/premium-vector/hand-drawn-monkey-ape-vr-box-virtual-nft-style_361671-246.jpg?w=2000', productUser: 'kashif', productLikes: '8', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'White Bored Ape', productPrice: 100, productImage: 'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31', productUser: 'kashif', productLikes: '8', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'Golden Bored Ape', productPrice: 100, productImage: 'https://cloudfront-us-east-2.images.arcpublishing.com/reuters/7GBCHQUCEROJDPEVYQW7XG7VAE.jpg', productUser: 'kashif', productLikes: '4', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'Black Bored Ape', productPrice: 100, productImage: 'https://i.pinimg.com/736x/d8/a7/06/d8a706b3ecef2b46ce339cd1957b1d59.jpg', productUser: 'kashif', productLikes: '10', productDescription: "This is the description of the Mint Blocks NFTs"},
      { productTitle: 'VR Bored Ape', productPrice: 100, productImage: 'https://img.freepik.com/premium-vector/hand-drawn-monkey-ape-vr-box-virtual-nft-style_361671-246.jpg?w=2000', productUser: 'kashif', productLikes: '8', productDescription: "This is the description of the Mint Blocks NFTs"},
      ];
  return (
    <div>
      <Products title="Latest NFTs" productsArray={productsArrayApp} pquantityOfNfts= {8}/>
    </div>
  )
}

export default Explore
