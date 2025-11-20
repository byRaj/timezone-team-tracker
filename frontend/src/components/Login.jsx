
import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn, Shield, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.id || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const success = await login(credentials.id, credentials.password);
    
    if (!success) {
      setError('Invalid credentials. Try: admin@example.com / admin');
    }
    
    setIsLoading(false);
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: theme === 'dark' ? '#0f172a' : '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const inputStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
    color: theme === 'dark' ? '#ffffff' : '#1e293b',
    padding: '12px',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '16px'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: isLoading ? '#6b7280' : '#059669',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: isLoading ? 0.7 : 1
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            marginBottom: '16px'
          }}>
            <Shield size={32} color="white" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#ffffff' : '#1e293b',
            marginBottom: '8px'
          }}>Welcome Back</h1>
          <p style={{
            color: theme === 'dark' ? '#94a3b8' : '#64748b'
          }}>Access your team dashboard</p>
        </div>

        <div style={cardStyle}>
          <div style={{ padding: '24px' }}>
            <h2 style={{
              fontSize: '20px',
              color: theme === 'dark' ? '#ffffff' : '#1e293b',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              Sign in to continue
            </h2>
            
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#dc2626'
              }}>
                <AlertCircle size={16} />
                <span style={{ fontSize: '14px' }}>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  color: theme === 'dark' ? '#d1d5db' : '#374151',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  User ID
                </label>
                <input
                  type="text"
                  value={credentials.id}
                  onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="admin@example.com"
                  required
                  disabled={isLoading}
                  style={inputStyle}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: theme === 'dark' ? '#d1d5db' : '#374151',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="admin"
                  required
                  disabled={isLoading}
                  style={inputStyle}
                />
              </div>
              
              <button type="submit" style={buttonStyle} disabled={isLoading}>
                <LogIn size={16} />
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
