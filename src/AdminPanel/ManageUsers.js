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
  
export const ManageUsers = () => {
  return (

    
        <div className="container user-dashboard-page">
          <div className=" user-sidebar">
          <AdminSidebar />
          </div>
          <div className="user-main container ms-3">
          <div className="heading">
            <h3 className="">
              User Management
            </h3>
            <p>Manage users on the NFT marketplace</p>
          </div>
          <table className="table">
            <thead>
              <tr className="table-light">
                <th scope="col">Username</th>
                <th scope="col">Wallet Address</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{Users.map(UserRow)}</tbody>
          </table>
          <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <Link class="page-link" href="#" tabindex="-1">Previous</Link>
    </li>
    <li class="page-item active"><Link class="page-link" href="#">1<span class="sr-only">(current)</span></Link></li>
    <li class="page-item ">
      <Link class="page-link" href="#">2 </Link>
    </li>
    <li class="page-item"><Link class="page-link" href="#">3</Link></li>
    <li class="page-item">
      <Link class="page-link" href="#">Next</Link>
    </li>
  </ul>
</nav>
        </div>

        </div>
     
  
    
  )
}
