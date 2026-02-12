import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Home page
import Companies from './components/Companies'; // Companies list
import AddCompany from './components/CompanyForm'; // Add company page (Make sure CompanyForm.js exists)
import UpdateCompanyForm from './components/UpdateCompanyForm'; // Update company form
import UserManagement from './components/UserManagement'; // Manage users page

import AddUser from './components/AddUser'; // Add user page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getAllCompany" element={<Companies />} />
        <Route path="/companies/add" element={<AddCompany />} />
        <Route path="/update-company/:companyId" element={<UpdateCompanyForm />} />
        
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
