import UserSidebar from './Components/UserSidebar'
import { Link } from 'react-router-dom'
import './UserDashboard.css'
import React, { useState, useEffect } from 'react'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import nftmarketaddress from '../config'
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Modal from 'react-bootstrap/Modal'
import './UserDashboard.css'
const MyDigitalAssets = () => {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [newPrice, setNewPrice] = useState([])
  const [showModal, setShowModal] = useState(false)
  
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  useEffect(() => {
    fetchMyAssets()
  }, [])
  function ncard(val) {
   
    function formatAddress(address) {
      return `${address.slice(0, 3)}...${address.slice(-4)}`;
    }
    
    return (<>
      <tr key={val.tokenId}>
        <th scope="row">{val.tokenId}</th>
        <td className="mint-image img-fluid" width={1}>
          <img src={val.image} alt="" height={40} />{' '}
        </td>
        <td>{val.name}</td>
        <td>{val.price} MATIC</td>
        {/* {
          setNewPrice(val.price)
        } */}
        <td>{formatAddress(val.owner)} (You)</td>
        <td>
          <button type="button" className="btn btn-success" onClick={() => resellNft(val)}>
            Resell
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

  async function fetchMyAssets() {

    // const provider = new ethers.providers.JsonRpcProvider()
    //   const contract = new ethers.Contract(nftmarketaddress, nftmarketaddress, provider)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarketplace.abi, signer)

    const data = await contract.fetchMyNFTs()
    // console.log(signer.getAddress().toLowerCase())
    const itemsListedByWallet = data.filter((i) => i.owner.toLowerCase() === wAddressLocalget);

    //items is an array that stores all the values from the data array, but with additional information added to each item. The additional information is obtained by calling the contract.tokenURI method and making an HTTP GET request to the returned URI. The retrieved metadata, along with the token ID, seller, owner, and price of the NFT, is then used to create an item object for each NFT. Finally, the items array is populated with these item objects.

    const items = await Promise.all(itemsListedByWallet.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')

  }
  async function resellNft(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, NFTMarketplace.abi, signer);

    // open the popup
    const newPrice = await new Promise((resolve, reject) => {
      const priceInput = document.createElement('input');
      priceInput.setAttribute('type', 'number');
      priceInput.setAttribute('min', '0');
      priceInput.setAttribute('step', '0.01');
      priceInput.setAttribute('placeholder', 'Enter new price');
      priceInput.style.width = '100%';
      priceInput.style.marginBottom = '10px';

      priceInput.style.padding = '10px';
      priceInput.style.border = '1px solid #ccc';
      priceInput.style.borderRadius = '5px';
      priceInput.style.fontSize = '16px';
      priceInput.style.fontFamily = 'Arial';
      const submitButton = document.createElement('button');
      submitButton.innerText = 'Submit';
      submitButton.style.width = '100%';
      submitButton.style.padding = '10px';
      submitButton.style.border = 'none';
      submitButton.style.borderRadius = '5px';
      submitButton.style.backgroundImage = "linear-gradient(to right, #0d6efd , #5ae8a6)";
      submitButton.style.color = '#fff';
      submitButton.style.fontSize = '16px';
      submitButton.style.fontFamily = 'Arial';
      submitButton.style.cursor = 'pointer';
      submitButton.style.transition = 'background-color 0.3s';
      submitButton.addEventListener('click', () => {
        if (priceInput.value) {
          resolve(ethers.utils.parseUnits(priceInput.value.toString(), 'ether'));
          popup.remove();
        } else {
          reject();
        }
      });

      const closeButton = document.createElement('button');
      closeButton.innerText = 'Close';
      closeButton.style.width = '100%';
      closeButton.style.padding = '10px';
      closeButton.style.marginTop = '10px';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '5px';
      closeButton.style.backgroundColor = 'red';
      closeButton.style.color = '#fff';
      closeButton.style.fontSize = '16px';
      closeButton.style.fontFamily = 'Arial';
      closeButton.style.cursor = 'pointer';
      closeButton.style.transition = 'background-color 0.3s';
      closeButton.addEventListener('click', () => {
        reject();
        popup.remove();
      });

      const popupTitle = document.createElement('h3');
      popupTitle.innerText = 'Set New Price for Reselling';
      popupTitle.style.textAlign = 'center';

      const popupContent = document.createElement('div');
      popupContent.style.padding = '20px';
      popupContent.appendChild(popupTitle);
      popupContent.appendChild(priceInput);
      popupContent.appendChild(submitButton);
      popupContent.appendChild(closeButton);

      const popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.borderRadius = '20px';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.width = '80%';
      popup.style.maxWidth = '500px';
      popup.style.backgroundImage = "linear-gradient(to right, #5ae8a6 , #0d6efd)";
      popup.style.display = 'flex';
      popup.style.flexDirection = 'column';
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.appendChild(popupContent);

      document.body.appendChild(popup);
    });

    // check if the new price is different from the old price
    if (newPrice !== nft.price) {
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      const transaction = await contract.resellToken(nft.tokenId, newPrice, { value: listingPrice });
      await transaction.wait();
      fetchMyAssets();
    }
  }
  let wAddressLocalget = JSON.parse(localStorage.getItem('wAddressLocal'));
  console.log(wAddressLocalget);
  if (wAddressLocalget !== null) {
    return (
      <div>
        <div className="container user-dashboard-page">
          <div className=" user-sidebar">
            <UserSidebar />
          </div>
          <div className="user-main container">
            <div className="heading">
              <h3 className="mt-3">
                My Digital Assets
              </h3>
              <p>All purchased NFTs are listed below</p>
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{nfts.map(ncard)}</tbody>
        </table>
      )}
            {/* <Stack spacing={2} className="ms-5">
            <Pagination
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
            />
          </Stack> */}
            <nav aria-label="...">

            </nav>
          </div>
        </div>
      </div>
    )
  }
  else {
    console.log("NO")

    return (
      <div className="container">
        <p>You don't have permissions to access this page. Please connect your wallet.</p>
      </div>


    )
  }

}

export default MyDigitalAssets
