// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Make sure the URL matches your backend

// Create a company
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${BASE_URL}/companies/create-company`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get a company by ID
export const getCompanyById = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/companies/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    throw error;
  }
};

// Get all companies
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/companies/getAllCompany`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies from API:', error);
    throw error;
  }
};

// Delete a company
export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/companies/delete-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;
  }
};

// Add user to a company
export const addUserToCompany = async (userId, companyId) => {
  try {
    const response = await axios.post(`${BASE_URL}/companies/${companyId}/add-user/${userId}`, { companyId });
    return response.data;
  } catch (error) {
    console.error('Error adding user to company:', error);
    throw error;
  }
};

// Remove user from a company
export const removeUserFromCompany = async (userId, companyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/companies/${companyId}/remove-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing user from company:', error);
    throw error;
  }
};
// Update Company API
export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/companies/update-company/${companyId}`, companyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error.response ? error.response.data : error.message);
    throw error;
  }
};


// Create a user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/createuser`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get a user by ID
export const getUserById = async (empId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/find-user/${empId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/users`);
    console.log('API getUsers response.data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Deactivate user
export const deactivateUser = async (empId) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${empId}/deactivate`);
    return response.data;
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (empId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/users/${empId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (empId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/users/${empId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
