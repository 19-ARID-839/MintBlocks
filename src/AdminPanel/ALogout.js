import React from 'react'
import AdminSidebar from './Components/AdminSidebar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../UserPanel/Logout.css'
import {Link} from 'react-router-dom';

const ALogout = () => {
  return (
    <div className="container user-dashboard-page">
        
          <div className=" user-sidebar">
          <AdminSidebar />
          </div>
          <div className="user-main container ms-3">
          <Card>
          <Card.Body className="bt">
            <h3 className="text mt-5 mb-5">Do you want to logout ?</h3>
            <div className="text-center">
              <Button variant="info" className="mb-5">
                {' '}
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
        </div>
      </div>
  )
}

export default ALogout