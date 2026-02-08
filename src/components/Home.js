
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Company Management App</h1>
      <p>Create, manage companies, and users easily.</p>
      
     
      <div className="button-container">
        <Link to="/companies">
          <button className="button">View Companies</button>
        </Link>
        
        <Link to="/companies/add">
          <button className="button">Add Company</button>
        </Link>

        <Link to="/users">
          <button className="button">Manage Users</button>
        </Link>

       

       
        <Link to="/users/add">
          <button className="button">Add User</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
