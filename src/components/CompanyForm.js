
import React, { useState } from 'react';
import { createCompany } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import './CompanyForm.css';

function CompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [cmpId, setCmpId] = useState('');
  const [active, setActive] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!companyName || !companyAddress || !cmpId) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const companyData = {
      companyName,
      companyAddress,
      cmpId,
      active,
    };

    try {
      await createCompany(companyData); 
      alert('Company added successfully!');
      navigate('/companies'); 
    } catch (error) {
      setErrorMessage('Failed to add company. Please try again.');
      console.error('Error adding company:', error);
    }
  };

  return (
    
    <div className="form-container">
      <h2>Add New Company</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Address"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company ID (cmpId)"
          value={cmpId}
          onChange={(e) => setCmpId(e.target.value)} 
          required
        />
        <div>
          <label>Active</label>
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)} 
          />
        </div>
        <button type="submit">Add Company</button>
      </form>
    </div>
    
  );
}

export default CompanyForm;
