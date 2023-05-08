import React,  { useState } from 'react'
import UserSidebar from './Components/UserSidebar'
// import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from "ipfs-http-client";
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import nftmarketaddress from '../config'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ThreeSixtyRounded } from '@mui/icons-material';
const fs = require('fs');
// const axios = require('axios');


const Orders = () => {
  let imageUrl="";
  const projectId = "2LYV9kyxorwvJiMS5DxpEOwLxMy";
const projectSecret = "c5927cc35e654ef1a4137d1ac95cf8dc";
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0/')
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers:{
    authorization
  }
})
  let wAddressLocalget = JSON.parse(localStorage.getItem('wAddressLocal'));
  console.log(wAddressLocalget);

  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file);
      const url = `https://mint-blocks-nfts.infura-ipfs.io/ipfs/${added.path}`
      setFileUrl(url)
      console.log(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://mint-blocks-nfts.infura-ipfs.io/ipfs/${added.path}`
      imageUrl=fileUrl
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
 
  async function listNFTForSale() {
    const url = await uploadToIPFS();
  
    // Check if there is a Web3 provider (i.e. Metamask) and if the user is connected
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        // Request user's permission to connect their Metamask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Initialize Web3Modal with the injected Ethereum provider from Metamask
        const web3Modal = new Web3Modal({
          network: 'mainnet', // Or the Ethereum network ID you want to connect to
          cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        // Get the owner and seller addresses
        const ownerAddress = await provider.getSigner().getAddress();
        const sellerAddress = await provider.getSigner().getAddress();
  
        // Create the NFT item
        const contract = new ethers.Contract(nftmarketaddress, NFTMarketplace.abi, signer);
        const price = ethers.utils.parseUnits(formInput.price, 'ether');
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();
        let transaction = await contract.createToken(url, price, { value: listingPrice });
        await transaction.wait();
  
        // Create the data object to be sent to the database
        const data = {
          name: formInput.name,
          description: formInput.description,
          price: formInput.price,
          fileUrl: imageUrl,
          ownerAddress: ownerAddress,
          sellerAddress: sellerAddress,
        };


  console.log(fileUrl);
        console.log('Data to be sent to the database:', data);
  
        // Send the data object to the database
        const response = await axios.post('http://localhost:8000/nfts', data);
        console.log('Response from the server:', response.data);
        navigate('/user-dashboard/unsold-nfts');
  
      } catch (error) {
        console.error('Error:', error);
  
        if (error.response && error.response.data) {
          console.log('Validation errors:', error.response.data);
        }
      }
    } else {
      // Display an error message if the user is not connected to Metamask
      console.error('Please install Metamask or connect to the Ethereum network.');
    }
  }



  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const files = (form[0]).files;

  //   if (!files || files.length === 0) {
  //     return alert("No files selected");
  //   }

  //   const file = files[0];
  //   // upload files
  //   const result = await client.add(file);

  //   setImages([
  //     ...images,
  //     {
  //       cid: result.cid,
  //       path: result.path,
  //     },
  //   ]);

  //   form.reset();
  // };

  if (wAddressLocalget !== null) {
  return (
    <div>
       <div className="container user-dashboard-page">
            <div className="user-sidebar">
                <UserSidebar />

            </div>
            <div className="user-main  container ms-3">
        <div className="heading">
            <h3 className="mt-3">
              Add New NFT
            </h3>
            <form>
            

  <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Title</label>
    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
  </div>
  <div className="form-group">
    <label htmlFor="price">Price</label>
    <input type="number" className="form-control" id="price" onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
    
    />
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
    ></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlFile1">Image</label><br/>
    <input type="file" className="form-control-file" id="exampleFormControlFile1"
    
    name="Asset"
    
    onChange={onChange}
    
    />
    {
          fileUrl && (
            <img width="350" src={fileUrl} alt="Nft image"/>
          )
        }
  </div> 
  <button type="button" onClick={listNFTForSale} className="btn btn-primary mt-3">Upload</button>
</form>
 {/* {client && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <input type="file" name="file"/>
            <button type="submit">Upload file</button>
          </form>
          <div>
        {images.map((image, index) => (
          <img
          alt={`Uploaded #${index + 1}`}
          src={"https://mint-blocks-nfts.infura-ipfs.io/ipfs/" + image.path}
            style={{ maxWidth: "400px", margin: "15px" }}
            key={image.cid.toString() + index}
          />
        ))}
      </div>
        </>
      )} */}
          </div>
          </div>
        </div>

    </div>
    
  )
}
else{
  console.log("NO")
        
  return(
    <div className="container">
<p>You don't have permissions to access this page. Please connect your wallet.</p>
    </div>
  
    
  )
}

}



export default Orders
