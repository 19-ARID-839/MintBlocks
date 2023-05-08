import React from 'react'
import { Link } from 'react-router-dom'
import '../../UserPanel/Components/UserSidebar.css';

import {  FaUser } from 'react-icons/fa'
import { RiLogoutCircleLine } from 'react-icons/ri'

const AdminSidebar = () => {
   return (
      <div>
         <ul>
            
         <Link to="/admin/">
               <li>
               <FaUser />Pending Requests
               </li>
            </Link>
            <Link to="/admin/manage-users">
               <li>
               <FaUser />Manage Users
               </li>
            </Link>
            <Link to="/admin/featured">
               <li>
                  <RiLogoutCircleLine /> Featured Listings
               </li>
            </Link>
            <Link to="/admin/">
               <li>
                  <RiLogoutCircleLine /> NFTs
               </li>
            </Link>
            <Link to="/admin/">
               <li>
                  <RiLogoutCircleLine /> Assets
               </li>
            </Link>
            <Link to="/admin/">
               <li>
                  <RiLogoutCircleLine /> Transactions
               </li>
            </Link>
            <Link to="/admin/">
               <li>
                  <RiLogoutCircleLine /> Edit Website
               </li>
            </Link>
            <Link to="/admin/logout">
               <li>
                  <RiLogoutCircleLine /> Logout
               </li>
            </Link>
         </ul>
      </div>
   )
}

export default AdminSidebar
