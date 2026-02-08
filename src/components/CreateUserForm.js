
import React, { useState } from 'react';
import { createUser } from '../api/api'; 

function CreateUserForm({ companyId, onUserAdded }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    empId: '',
    designation: '',
    dateOfBirth: '',
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(''); 
    setSuccessMessage(''); 

    try {
      
      const dataToSend = { ...userData, companyId };
      const newUser = await createUser(dataToSend);
      onUserAdded(newUser);
      setSuccessMessage('User Added Successfully!'); 
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        empId: '',
        designation: '',
        dateOfBirth: '',
        active: true,
      });
    } catch (err) {
      setError('Failed to create user.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          name="empId"
          value={userData.empId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Designation:</label>
        <input
          type="text"
          name="designation"
          value={userData.designation}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={userData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={userData.active}
            onChange={handleChange}
          />
        </label>
      </div>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating User...' : 'Create User'}
      </button>
    </form>
  );
}

export default CreateUserForm;
