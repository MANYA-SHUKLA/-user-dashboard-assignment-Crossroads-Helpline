import React from 'react';
import type { User } from '../../types/user';
import { Edit2, Trash2, Globe, Mail, Phone } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <p className="empty-text">No users found</p>
        <button 
          className="btn btn-primary"
          onClick={() => onEdit({} as User)}
        >
          Add Your First User
        </button>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="hidden sm:table-cell">Website</th>
            <th className="hidden md:table-cell">Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td>
                <span className="status-badge status-active">
                  #{user.id}
                </span>
              </td>
              <td>
                <div style={{fontWeight: '600', color: 'inherit'}}>
                  {user.name}
                </div>
              </td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Mail size={14} />
                  <a 
                    href={`mailto:${user.email}`}
                    style={{
                      color: '#0ea5e9',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    className="email-link"
                  >
                    {user.email}
                  </a>
                </div>
              </td>
              <td>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Phone size={14} />
                  <span style={{color: 'inherit'}}>
                    {user.phone}
                  </span>
                </div>
              </td>
              <td className="hidden sm:table-cell">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Globe size={14} />
                  <a 
                    href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#0ea5e9',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    className="website-link"
                  >
                    {user.website}
                  </a>
                </div>
              </td>
              <td className="hidden md:table-cell">
                <span style={{
                  backgroundColor: 'rgba(14, 165, 233, 0.1)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }} className="company-tag">
                  {user.company.name}
                </span>
              </td>
              <td>
                <div className="action-icons">
                  <button
                    className="icon-btn icon-edit"
                    onClick={() => onEdit(user)}
                    title="Edit user"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-btn icon-delete"
                    onClick={() => handleDelete(user.id)}
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;