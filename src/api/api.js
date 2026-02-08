// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/cms/api'; // Make sure the URL matches your backend

// Existing createCompany function
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-company`, companyData);
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// New getCompany function
export const getCompany = async (companyId) => {
  try {
    const response = await axios.get(`http://localhost:8080/cms/api/companies/${companyId}`);
    return response; // Assuming the data is directly in the response
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error; // Rethrow error if needed for handling in the component
  }
};

// Existing getCompanies function
export const getCompanies = async () => {
  try {
    const response = await axios.get('http://localhost:8080/cms/api/companies');
    return response.data;  // Assuming the response is in response.data
  } catch (error) {
    console.error('Error fetching companies from API:', error);
    throw error;  // Re-throw the error to be caught by the calling function
  }
};


//dd user to the company
export const migrateUser = async (userId, companyId) => {
  try {
    const response = await axios.put(`http://localhost:8080/cms/api/1/add-user/${userId}`, { companyId });
    return response.data;
  } catch (error) {
    console.error('Error migrating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);  
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};




export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-company/${companyId}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;  
  }
};

export const createUser = async (userData) => {
  try {
    // API endpoint URL adjusted to your desired endpoint
    const response = await axios.post('http://localhost:8080/cms/api/createuser', userData); 
    return response.data;  // Return the response data (new user)
  } catch (error) {
    console.error('Error creating user:', error);  // Log the error for debugging
    throw error;  // Re-throw the error for further handling in the calling component
  }
};

export const deleteUser = async (empId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/cms/api/users/${empId}`);
    return response.data;  // Return the API response data after deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;  // Re-throw error to be caught in the calling component
  }
};


export const deactivateUser = async (empId) => {
  try {
    // Make sure the empId is dynamically added to the URL
    const response = await axios.put(`${BASE_URL}/${empId}/deactivate`);
    return response.data;  // Return the response data (success message, status, etc.)
  } catch (error) {
    console.error('Error deactivating user:', error.response ? error.response.data : error.message);
    throw error;  // Re-throw the error to be caught by the calling function
  }
};


export const getUserById = async (empId) => {
  try {
    const response = await axios.get(`${BASE_URL}/find-user/${empId}`);
    return response.data;  // Return the user data
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; // Throw the error to be caught in the
  }
};

export const getCompanyById = async (companyId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyId}`);  // Use dynamic companyId
    return response.data;  // Return the company data
  } catch (error) {
    throw new Error('Error fetching company by ID: ' + error.message);
  }
};


// Add user to a company (POST)
export const addUserToCompany = async (userId, companyId) => {
  try {
    const response = await axios.post(`${BASE_URL}/1/add-user/${userId}`, { companyId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user to company:', error);
    throw error;
  }
};

// Remove user from a company (DELETE)
export const removeUserFromCompany = async (userId, companyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/1/remove-user/${userId}`, {
      data: { companyId },
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing user from company:', error);
    throw error;
  }
};

export const updateUser = async (empId, userData) => {
  try {
    const response = await axios.put(`http://localhost:8080/cms/api/users/${empId}`, userData);
    return response.data;  // Return the updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Update Company API
export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-company/${companyId}`, companyData, {
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
    });
    return response.data; // Return the updated company data
  } catch (error) {
    console.error("Error updating company:", error.response ? error.response.data : error.message);
    throw error; // Throw error for further handling in the calling component
  }
};