import React, { useState, useEffect } from 'react';
import { createCompany } from '../api/api'; // Assuming this function exists

function CreateCompany() {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [cmpId, setCmpId] = useState('');
  const [active, setActive] = useState(true); // Default to active, can be toggled

  useEffect(() => {
    // Generate cmpId dynamically when component loads
    setCmpId('cmp' + Date.now()); // Example: 'cmp1639846375912'
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      companyName,
      companyAddress,
      cmpId,
      active,
    };

    try {
      await createCompany(companyData); // API call
      alert("Company Created!");
    } catch (error) {
      alert("Error creating company");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company Address"
        value={companyAddress}
        onChange={(e) => setCompanyAddress(e.target.value)}
      />
      {/* Dynamically generated cmpId */}
      <input
        type="text"
        placeholder="Company ID (cmpId)"
        value={cmpId}
        readOnly // Read-only since it's generated automatically
      />
      <div>
        <label>Active</label>
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)} // Toggle active status
        />
      </div>
      <button type="submit">Create Company</button>
    </form>
  );
}

export default CreateCompany;
