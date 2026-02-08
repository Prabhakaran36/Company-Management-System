
import React from 'react';
import { Link } from 'react-router-dom';

function Companies() {
  return (
    <div>
      <h2>Companies List</h2>
      
      <Link to="/companies/add">Add Company</Link>
    </div>
  );
}

export default Companies;
