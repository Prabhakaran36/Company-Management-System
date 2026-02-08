
import React, { useState, useEffect } from 'react';
import { getCompanies } from '../api/api'; 
import './CompanyList.css';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();  
      console.log(response); 
      setCompanies(response);  
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch companies.");
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="companies-container">
      <h2>Companies</h2>
      {companies.length === 0 ? (
        <div className="no-companies">No companies available. Please add one!</div>
      ) : (
        <div className="company-list">
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <h3>{company.companyName}</h3>
              <p>{company.companyAddress}</p>
              <p>Location: {company.latitude}, {company.longitude}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyList;
