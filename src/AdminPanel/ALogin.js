import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import AdminImage from '../Images/admin-login.webp'
import './ALogin.css'

const ALogin = () => {
    
    const [error, setError] = useState('');
    

  
    return (
      <div className="container">
        <div clsssName="admin-left">
            <center>
        <img className="admin-login-image" src={AdminImage}></img></center>
        </div>
        <div className="admin-right">
            
        <form>
        <h3>Admin Login</h3>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
            
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <Link to="/admin">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          </Link>
          
        </form></div>
      </div>
    );
}

export default ALogin