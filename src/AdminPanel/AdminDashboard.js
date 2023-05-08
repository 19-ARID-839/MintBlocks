import React from 'react'
import AdminSidebar from './Components/AdminSidebar'
import PendingUsers from './PendingUsersAPI'
import { Link } from 'react-router-dom'
function ncard(val) {
  return (
    <tr>
      <td>{val.username}</td>
      <td>{val.wallet_address}</td>
      <td className="mint-image img-fluid" width={1}>
        <img src={val.profile_image} alt="" height={40} />{' '}
      </td>
      <td>
        <button type="button" className="btn btn-success mr-2 btn-sm" onClick={() => approveUser(val.id)}>
          Approve
        </button>
        <button type="button" className="btn btn-danger btn-sm ml-4 " onClick={() => rejectUser(val.id)}>
          Reject
        </button>
      </td>
    </tr>
  )
}
const approveUser = (id) => {
}

const rejectUser = (id) => {
}

export const AdminDashboard = () => {
  return (
    <div className="container user-dashboard-page">
      <div className=" user-sidebar">
        <AdminSidebar />
      </div>
      <div className="user-main container ms-3">
        <div className="heading">
          <h3 className="">
            Pending Wallet Connections
          </h3>
          <p>All users who have connected their wallets are listed below</p>
        </div>
        <table className="table">
          <thead>
            <tr className="table-light">
              <th scope="col">Username</th>
              <th scope="col">Wallet Address</th>
              <th scope="col">Profile</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{PendingUsers.map(ncard)}</tbody>
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
