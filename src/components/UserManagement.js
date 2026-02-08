import React, { useState, useEffect } from 'react';
import {
  getUsers,
  deleteUser,
  deactivateUser,
  getUserById,
  updateUser
} from '../api/api';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmpId, setSearchEmpId] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [userToUpdate, setUserToUpdate] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleDelete = async (empId) => {
    try {
      await deleteUser(empId);
      setUsers(users.filter(user => user.empId !== empId));
      alert('User deleted successfully!');
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleDeactivate = async (empId) => {
    try {
      await deactivateUser(empId);
      setUsers(users.map(user =>
        user.empId === empId ? { ...user, active: false } : user
      ));
      alert('User deactivated successfully!');
    } catch (error) {
      setError('Failed to deactivate user');
    }
  };

  const handleSearch = async () => {
    if (!searchEmpId) {
      alert('Please enter an employee ID');
      return;
    }
    try {
      const response = await getUserById(searchEmpId);
      setSearchedUser(response);
      setError(null);
    } catch (error) {
      setError('User not found');
      setSearchedUser(null);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedData = {
        firstName: userToUpdate.firstName,
        lastName: userToUpdate.lastName,
        email: userToUpdate.email,
        designation: userToUpdate.designation,
        dateOfBirth: userToUpdate.dateOfBirth,
        active: userToUpdate.active
      };
      await updateUser(userToUpdate.empId, updatedData);
      alert('User updated successfully!');
      fetchUsers();
      setUserToUpdate(null);
    } catch (error) {
      setError('Failed to update user');
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

 
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Employee ID (e.g., EMP124)"
          value={searchEmpId}
          onChange={(e) => setSearchEmpId(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

     
      {searchedUser && (
        <div className="searched-user">
          <h3>Searched User Details</h3>
          <p><strong>First Name:</strong> {searchedUser.firstName}</p>
          <p><strong>Last Name:</strong> {searchedUser.lastName}</p>
          <p><strong>Email:</strong> {searchedUser.email}</p>
          <p><strong>Designation:</strong> {searchedUser.designation}</p>
          <p><strong>Emp ID:</strong> {searchedUser.empId}</p>
          <p><strong>Status:</strong> {searchedUser.active ? 'Active' : 'Inactive'}</p>
          <p><strong>Company ID:</strong> {searchedUser.company_id || 'N/A'}</p>
        </div>
      )}

   
      {users.length === 0 ? (
        <div className="no-users">No users available</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Emp ID</th>
              <th>Created Date</th>
              <th>Date of Birth</th>
              <th>Company ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.empId}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>{user.empId}</td>
                <td>{user.createdDate}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.company_id || 'N/A'}</td>

                
                <td className="action-buttons">
                  <button
                    className="update-button"
                    onClick={() => setUserToUpdate(user)}
                  >
                    📝 Update
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.empId)}
                  >
                    ❌ Delete
                  </button>

                  <button
                    className="deactivate-button"
                    onClick={() => handleDeactivate(user.empId)}
                    disabled={!user.active}
                  >
                    ⚫ Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

  
      {userToUpdate && (
        <div className="update-user-form">
          <h3>Update User</h3>

          <label>
            First Name:
            <input
              type="text"
              value={userToUpdate.firstName}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, firstName: e.target.value })
              }
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              value={userToUpdate.lastName}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, lastName: e.target.value })
              }
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={userToUpdate.email}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, email: e.target.value })
              }
            />
          </label>

          <label>
            Designation:
            <input
              type="text"
              value={userToUpdate.designation}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, designation: e.target.value })
              }
            />
          </label>

          <label>
            Date of Birth:
            <input
              type="date"
              value={userToUpdate.dateOfBirth}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, dateOfBirth: e.target.value })
              }
            />
          </label>

          <label>
            Active:
            <input
              type="checkbox"
              checked={userToUpdate.active}
              onChange={(e) =>
                setUserToUpdate({ ...userToUpdate, active: e.target.checked })
              }
            />
          </label>

          <button onClick={handleUpdateUser}>Update User</button>
          <button onClick={() => setUserToUpdate(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
