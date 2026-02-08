import React, { useEffect, useState } from 'react';
import {
  getCompanies,
  deleteCompany,
  getCompanyById,
  addUserToCompany,
  removeUserFromCompany,
  updateCompany,
} from '../api/api';
import './Companies.css';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchCompanyId, setSearchCompanyId] = useState('');
  const [searchedCompany, setSearchedCompany] = useState(null);

  const [addUserInputs, setAddUserInputs] = useState({});
  const [removeUserInputs, setRemoveUserInputs] = useState({});

  const [companyToUpdate, setCompanyToUpdate] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res || []);
    } catch {
      setError('Error fetching companies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchCompanyId) return alert('Enter company ID');

    try {
      const res = await getCompanyById(searchCompanyId);
      setSearchedCompany(res || null);
      setError(res ? null : 'Company not found');
    } catch {
      setError('Error fetching company');
      setSearchedCompany(null);
    }
  };

  const handleAddUser = async (companyId) => {
    const userId = addUserInputs[companyId];
    if (!userId) return alert('Enter user ID');

    try {
      await addUserToCompany(userId, companyId);
      alert('User added');
      loadCompanies();
    } catch {
      setError('Error adding user');
    }
  };

  const handleRemoveUser = async (companyId) => {
    const userId = removeUserInputs[companyId];
    if (!userId) return alert('Enter user ID');

    try {
      await removeUserFromCompany(userId, companyId);
      alert('User removed');
      loadCompanies();
    } catch {
      setError('Error removing user');
    }
  };

  const handleDelete = async (companyId) => {
    try {
      await deleteCompany(companyId);
      alert('Company deleted');
      loadCompanies();
    } catch {
      setError('Error deleting company');
    }
  };

  const handleUpdateCompany = async () => {
    if (!companyToUpdate) return;

    try {
      await updateCompany(companyToUpdate.id, {
        companyName: companyToUpdate.companyName,
        companyAddress: companyToUpdate.companyAddress,
        cmpId: companyToUpdate.cmpId,
        active: companyToUpdate.active,
      });
      alert('Company updated');
      setCompanyToUpdate(null);
      loadCompanies();
    } catch {
      setError('Error updating company');
    }
  };

  const handleCancelUpdate = () => {
    setCompanyToUpdate(null); 
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="companies-container">
      <h2 className='h2'>Companies</h2>

      
      <div className="search-section">
        <input
          placeholder="Enter Company ID"
          value={searchCompanyId}
          onChange={(e) => setSearchCompanyId(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchedCompany && (
        <div className="searched-company">
          <h3>{searchedCompany.companyName}</h3>
          <p>{searchedCompany.companyAddress}</p>
          <p>ID: {searchedCompany.id}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="company-list">
        {companies.map((company) => (
          <div key={company.id} className="company-card">
            <h3>{company.companyName}</h3>
            <p>{company.companyAddress}</p>

            
            <div className="form-group">
              <input
                placeholder="User ID"
                value={addUserInputs[company.id] || ''}
                onChange={(e) =>
                  setAddUserInputs({
                    ...addUserInputs,
                    [company.id]: e.target.value,
                  })
                }
              />
              <button className="btn primary" onClick={() => handleAddUser(company.id)}>
                Add User
              </button>
            </div>

            
            <div className="form-group">
              <input
                placeholder="User ID"
                value={removeUserInputs[company.id] || ''}
                onChange={(e) =>
                  setRemoveUserInputs({
                    ...removeUserInputs,
                    [company.id]: e.target.value,
                  })
                }
              />
              <button className="btn warning" onClick={() => handleRemoveUser(company.id)}>
                Remove User
              </button>
            </div>

            
            <div className="button-group">
              <button className="btn secondary" onClick={() => setCompanyToUpdate(company)}>
                Update Company
              </button>
              <button className="btn danger" onClick={() => handleDelete(company.id)}>
                Delete Company
              </button>
            </div>
          </div>
        ))}
      </div>

     
      {companyToUpdate && (
        <div className="update-company-form">
          <h3>Update Company</h3>

          <input
            value={companyToUpdate.companyName}
            onChange={(e) =>
              setCompanyToUpdate({ ...companyToUpdate, companyName: e.target.value })
            }
            placeholder="Company Name"
          />

          <input
            value={companyToUpdate.companyAddress}
            onChange={(e) =>
              setCompanyToUpdate({ ...companyToUpdate, companyAddress: e.target.value })
            }
            placeholder="Company Address"
          />

          <input
            value={companyToUpdate.cmpId}
            onChange={(e) =>
              setCompanyToUpdate({ ...companyToUpdate, cmpId: e.target.value })
            }
            placeholder="Company ID"
          />

          <label>
            <input
              type="checkbox"
              checked={companyToUpdate.active}
              onChange={(e) =>
                setCompanyToUpdate({ ...companyToUpdate, active: e.target.checked })
              }
            />
            Active
          </label>

          <div className="update-buttons">
            <button className="btn primary" onClick={handleUpdateCompany}>
              Save Changes
            </button>
            <button className="btn secondary" onClick={handleCancelUpdate}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Companies;
