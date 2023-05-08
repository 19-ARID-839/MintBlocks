import React, { useState } from 'react'
import Users from './UsersAPI'
import AdminSidebar from './Components/AdminSidebar'
import { Link } from 'react-router-dom'


  function UserRow(user) {
    const [isBlocked, setIsBlocked] = useState(user.isBlocked)
    const handleBlock = () => {
      setIsBlocked(!isBlocked)
      // Code to block/unblock user's wallet address on the NFT marketplace
    }
  
    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.wallet_address}</td>
        <td>
          {isBlocked ? (
            <button type="button" className="btn btn-danger" onClick={handleBlock}>
              Unblock
            </button>
          ) : (
            <button type="button" className="btn btn-success" onClick={handleBlock}>
              Block
            </button>
          )}
        </td>
      </tr>
    )
  }
  
export const FeaturedListings = () => {
  return (

    
        <div className="container user-dashboard-page">
          <div className=" user-sidebar">
          <AdminSidebar />
          </div>
          <div className="user-main container ms-3">
          <div className="heading">
            <h3 className="">
              Featured Listings
            </h3>
            <p>Feature Listings on the NFT marketplace</p>
          </div>
          
          
        </div>

        </div>
     
  
    
  )
}
