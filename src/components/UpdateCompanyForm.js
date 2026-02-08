import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateCompanyForm.css'; 

const UpdateCompanyForm = () => {
  const [company, setCompany] = useState({
    companyName: '',
    companyAddress: '',
    coordinates: { lat: '', long: '' },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 
  const { companyId } = useParams(); 
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cms/api/companies/${companyId}`);
        if (response.status === 200) {
          setCompany(response.data);
        } else {
          setError('Failed to fetch company data.'); 
        }
      } catch (err) {
        setError('Failed to fetch company data.');
      } finally {
        setLoading(false); 
      }
    };

    fetchCompany();
  }, [companyId]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'long') {
      setCompany((prevCompany) => ({
        ...prevCompany,
        coordinates: {
          ...prevCompany.coordinates,
          [name]: value,
        },
      }));
    } else {
      setCompany((prevCompany) => ({
        ...prevCompany,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/cms/api/update-company/${companyId}`,
        company
      );
      if (response.status === 200) {
        alert('Company updated successfully!');
        navigate('/companies');
      } else {
        setError('Failed to update company.'); 
      }
    } catch (err) {
      setError('Failed to update company.');
    }
  };

  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="update-company-container">
      <h2>Update Company</h2>
      {error && <p className="error">{error}</p>} 

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={company.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={company.companyAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lat">Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={company.coordinates.lat}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="long">Longitude</label>
          <input
            type="number"
            id="long"
            name="long"
            value={company.coordinates.long}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Update Company</button>
      </form>
    </div>
  );
};

export default UpdateCompanyForm;
