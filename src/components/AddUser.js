
import React, { useState } from 'react';
import CreateUserForm from './CreateUserForm'; 
import './AddUser.css';

function AddUser({ companyId }) {

  const [userAdded, setUserAdded] = useState(null);

  
  const handleUserAdded = (newUser) => {
    setUserAdded(newUser); 
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      
      
      <CreateUserForm companyId={companyId} onUserAdded={handleUserAdded} />

     
      {userAdded && (
        <div className="user-added">
          <h3>User Added Successfully</h3>
          <p><strong>Name:</strong> {userAdded.firstName} {userAdded.lastName}</p>
          <p><strong>Email:</strong> {userAdded.email}</p>
          <p><strong>Designation:</strong> {userAdded.designation}</p>
          <p><strong>Employee ID:</strong> {userAdded.empId}</p>
        </div>
      )}
    </div>
  );
}

export default AddUser;
