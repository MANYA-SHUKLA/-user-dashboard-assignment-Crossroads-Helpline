import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/userSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import UserTable from '../UserTable/UserTable';
import UserForm from '../UserForm/UserForm';
import { Users, UserPlus, RefreshCw, AlertCircle } from 'lucide-react';
import type { User } from '../../types/user';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getUsers());
  };

  const handleOpenForm = (user?: User) => {
    setSelectedUser(user || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">User Management Dashboard</h2>
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => handleOpenForm()}
          >
            <UserPlus size={18} />
            Add User
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>


      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'}}>
            <UserPlus size={24} />
          </div>
          <div className="stat-value">{users.filter(u => u.id > 10).length}</div>
          <div className="stat-label">Custom Users</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-value">{error ? 'Error' : 'Healthy'}</div>
          <div className="stat-label">System Status</div>
        </div>
      </div>

      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Fetching user data...</p>
        </div>
      )}
      {error && !loading && (
        <div className="error-message">
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <AlertCircle size={24} />
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            className="btn btn-primary"
            style={{marginTop: '16px'}}
          >
            Try Again
          </button>
        </div>
      )}
      {!loading && !error && (
        <UserTable 
          users={users} 
          onEdit={handleOpenForm}
        />
      )}
      <UserForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        user={selectedUser}
      />
    </div>
  );
};

export default Dashboard;