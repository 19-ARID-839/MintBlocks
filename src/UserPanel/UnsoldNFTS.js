import UserSidebar from "./Components/UserSidebar";
import React, { useState, useEffect } from "react";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import nftmarketaddress from "../config";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Modal from "react-bootstrap/Modal";
const Orders = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    loadNFTs();
  }, []);
  function ncard(val) {
    function formatAddress(address) {
      return `${address.slice(0, 3)}...${address.slice(-4)}`;
    }
    return (
      <>
        <tr>
        <td>{val.tokenId.slice(-3)} </td>
          <td className="mint-image" width={1}>
            <img
              src={val.fileUrl}
              alt=""
              className="rounded fluid"
              height={40}
              onClick={handleShowModal}
            />
          </td>
          <td>{val.name}</td>
          <td>{val.price} MATIC</td>
          <td>{formatAddress(val.owner)}</td>
          <td>{formatAddress(val.seller)}</td>
          {/* <td>{val.description} </td> */}
          <td>
            <button
              type="Button"
              className="btn btn-outline-info me-2 mt-2"
              onClick={() => buyNft(val)}
            >
              Buy
            </button>
          </td>
          
        </tr>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body>
            <img src={val.image} alt="" className="img-fluid" />
          </Modal.Body>
        </Modal>
      </>
    );
  }
  async function loadNFTs() {
    const response = await axios.get("http://localhost:8000/api/nfts");

    const items = response.data.map((item) => ({
      price: item.price,
      tokenId: item._id,
      seller: item.sellerAddress,
      owner: item.ownerAddress,
      image: item.fileUrl,
      name: item.name,
      description: item.description,
    }));
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarketplace.abi, signer)
    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    try {
      const response = await axios.post("http://localhost:8000/api/buy-now", {
        _id: nft.tokenId,
      });
      console.log(response.data.message);
      loadNFTs();
    } catch (error) {
      console.error(error);
    }
    await transaction.wait()
    loadNFTs()
  }
  let wAddressLocalget = JSON.parse(localStorage.getItem("wAddressLocal"));
  if (wAddressLocalget !== null) {
    return (
      <div className="container user-dashboard-page">
        <div className=" user-sidebar">
          <UserSidebar />
        </div>
        <div className=" user-main container">
          <div className="heading">
            <h3 className="mt-3">All Created NFTs</h3>
            <p>All created NFTs are listed below</p>
          </div>
          {nfts.length === 0 ? (
            <p>No NFTs to display.</p>
          ) : (
            <table className="table">
              <thead>
                <tr className="table-light">
                <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Seller</th>
                  {/* <th scope="col">Description</th> */}
                  <th scope="col">Action</th>
                 
                </tr>
              </thead>
              <tbody>{nfts.map(ncard)}</tbody>
            </table>
          )}
          <nav aria-label="..."></nav>
        </div>
      </div>
    );
  } else {
    console.log("NO");
    return (
      <div className="container">
        <p>
          You don't have permissions to access this page. Please connect your
          wallet.
        </p>
      </div>
    );
  }
};
export default Orders;
