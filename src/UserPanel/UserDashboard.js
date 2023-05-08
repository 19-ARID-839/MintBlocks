import "./UserDashboard.css";
import UserSidebar from "./Components/UserSidebar";
import React, { useState, useEffect } from "react";
import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import nftmarketaddress from "../config";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Modal from "react-bootstrap/Modal";
const UserDashboard = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [selectedNft, setSelectedNft] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const handleShowModal = () => setShowModal(true);
  const handleShowModal = (nft) => {
    setSelectedNft(nft);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    fetchMyList();
  }, []);
  function ncard(val) {
    const handleDelete = async () => {
      try {
        if (!val || !val.tokenId) {
          return;
        }

        await axios.delete(`http://localhost:8000/api/nfts/${val.tokenId}`);
        // remove the deleted NFT from the nfts state
        setNfts((prevNfts) =>
          prevNfts.filter((nft) => nft.tokenId !== val.tokenId)
        );
      } catch (error) {
        console.error(error);
      }
    };
    function formatAddress(address) {
      return `${address.slice(0, 3)}...${address.slice(-4)}`;
    }
    return (
      <>
        {/* <tr key={val.tokenId}> */}
        <tr>
          <td>{val.tokenId.slice(-3)} </td>
          {/* <th scope="row">{val.tokenId}</th> */}
          <td className="mint-image" width={1}>
            <img
              src={val.image}
              alt=""
              className="rounded fluid"
              height={40}
              onClick={() => handleShowModal(val)}
            />
          </td>
          <td>{val.name}</td>
          <td>{val.price} MATIC</td>
          <td>{val.description} </td>
          <td>
            <button
              type="Button"
              className="btn btn-outline-danger me-2 mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </tr>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body>
            {selectedNft && (
              <img src={selectedNft.image} alt="" className="img-fluid" />
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  async function fetchMyList() {
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
    // Get the current user's address
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const currentUserAddress = await signer.getAddress();

  // Filter the NFTs to only show those owned by the current user
  const myNfts = items.filter((nft) => nft.owner === currentUserAddress);
  setNfts(myNfts);
  setLoadingState("loaded");
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
                  <th scope="col">Description</th>
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
export default UserDashboard;
