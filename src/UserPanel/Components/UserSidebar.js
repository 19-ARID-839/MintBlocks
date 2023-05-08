import React from 'react'
import { Link } from 'react-router-dom'
import './UserSidebar.css'
import { FaLaptop, FaShoppingCart, FaUser } from 'react-icons/fa'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { SiBlockchaindotcom } from 'react-icons/si'
// import { BsCurrencyBitcoin } from 'react-icons/bs'
import { MdOutlinePending } from 'react-icons/md'
const UserSidebar = () => {
   return (
      <div>
         <ul>
            <Link to="/user-dashboard/profile">
               <li>
                  <FaUser /> Profile
                  
               </li>
            </Link>
            <Link to="/user-dashboard/creator">
               <li>
                  <FaLaptop /> Creator Dashboard
               </li>
            </Link>
            
            <Link to="/user-dashboard/unsold-nfts">
               <li >
                  <MdOutlinePending /> Unsold NFTs
               </li>
            </Link>
            <Link to="/user-dashboard/sell-digital-asset">
               <li >
                  <SiBlockchaindotcom /> Sell Digital Asset
               </li>
            </Link>
            <Link to="/user-dashboard/my-digital-assets">
               <li >
                  <FaShoppingCart /> My Digital Assets
               </li>
            </Link>
            {/* <Link to="/user-dashboard/orders-placed">
                    <li >
                       <BsCurrencyBitcoin/> Orders Placed
                    </li>
                    </Link> */}

            <Link to="/user-dashboard/logout">
               <li>
                  <RiLogoutCircleLine /> Logout
               </li>
            </Link>
         </ul>
      </div>
   )
}

export default UserSidebar
