// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Home page
import Companies from './components/Companies'; // Companies list
import AddCompany from './components/CompanyForm'; // Add company page
import AddUser from './components/AddUser'; // Add user page
import UpdateCompanyForm from './components/UpdateCompanyForm'; // Import the new form
import UserManagement from './components/UserManagement'; // Manage users page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/add" element={<AddCompany />} />
        <Route path="/update-company/:companyId" element={<UpdateCompanyForm />} /> {/* New route for update */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/migrate" element={<div>Migrate Users Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
