import React, { useState, useEffect } from 'react';
import type { User, UserFormData } from '../../types/user';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../redux/userSlice';
import { X, Save, User as UserIcon } from 'lucide-react';
import { generateUserId } from '../../services/apiService';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    companyName: ''
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        companyName: user.company.name
      });
    } else {
      resetForm();
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      companyName: ''
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newUser: User = {
      id: user ? user.id : generateUserId([]), 
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website.startsWith('http') ? formData.website : `https://${formData.website}`,
      company: {
        name: formData.companyName
      }
    };

    if (user) {
      dispatch(updateUser(newUser));
    } else {
      dispatch(addUser(newUser));
    }

    resetForm();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
 
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '500px',
          animation: 'slideUp 0.3s ease-out'
        }}
      >
        <div className="modal-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserIcon size={20} color="white" />
            </div>
            <h3 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: 700,
              color: 'inherit'
            }}>
              {user ? 'Edit User' : 'Create New User'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="icon-btn"
            style={{
              background: 'none',
              color: '#64748b',
              border: '1px solid #e2e8f0'
            }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{marginTop: '24px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#475569'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter full name"
                style={{
                  borderColor: errors.name ? '#ef4444' : ''
                }}
              />
              {errors.name && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#475569'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter email address"
                style={{
                  borderColor: errors.email ? '#ef4444' : ''
                }}
              />
              {errors.email && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#475569'
              }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter phone number"
                style={{
                  borderColor: errors.phone ? '#ef4444' : ''
                }}
              />
              {errors.phone && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#475569'
              }}>
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input-field"
                placeholder="example.com"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#475569'
              }}>
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter company name"
                style={{
                  borderColor: errors.companyName ? '#ef4444' : ''
                }}
              />
              {errors.companyName && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.companyName}
                </span>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{flex: 1}}
            >
              <Save size={18} />
              {user ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{flex: 1}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;