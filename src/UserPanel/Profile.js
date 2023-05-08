
import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import UserSidebar from './Components/UserSidebar'
import Header from '../MyComponents/Header'
// import {useLocation} from 'react-router-dom';
const Profile = () => {
  // let wAddressLocalget = localStorage.getItem("wAddressLocal")
  let wAddressLocalget = JSON.parse(localStorage.getItem('wAddressLocal'));
  console.log(wAddressLocalget);
  if (wAddressLocalget !== null) {

    console.log("Profilre page");
    return (
      <div>
        {/* <Header/> */}
        <div className="container user-dashboard-page">
          <div className=" user-sidebar">
            <UserSidebar />
          </div>
          <div className="user-main  container ms-3">
          <div className="heading">
              <h3 className="mt-3">
                Your Profile
              </h3>
              <p>You must complete your profile 100% before minting or collecting NFTs</p>
              <p>Your Wallet Address is  {wAddressLocalget}</p>
              {/* {location.state.walletAddress} */}
            </div>
            <div className="profile-container">
              <Form>
                <Form.Group>
                  <Form.Label>Change Image</Form.Label>
                  <Form.Control type="file" placeholder="Choose File" autoFocus />
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Your Name" autoFocus />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control type="text" placeholder="@username" autoFocus />
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email adress"
                    autoFocus
                  />
                </Form.Group> */}
                <br/>
                <div className="d-grid gap-2">
        <Button variant="primary" size="lg">
          Save Changes
        </Button>
        {/* <Button variant="secondary" size="lg">
          Block level button
        </Button> */}
      </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
    
  } else {

    console.log("NO")
    return(
      <div className="container">
<p>You don't have permissions to access this page. Please connect your wallet.</p>
      </div>
    
      
    )
    
  }
  // const location = useLocation();
  
  
}

export default Profile
