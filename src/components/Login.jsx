
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn, Shield } from 'lucide-react';

export const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const { login } = useAdmin();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.id || !credentials.password) {
      return;
    }
    login(credentials.id, credentials.password);
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

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '32px'
  };

  const iconContainerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    marginBottom: '16px'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#1e293b',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
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
    backgroundColor: '#059669',
    color: '#ffffff',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <Shield size={32} color="white" />
          </div>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>Access your team dashboard</p>
        </div>

        <div style={cardStyle}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '20px', color: theme === 'dark' ? '#ffffff' : '#1e293b', textAlign: 'center', marginBottom: '24px' }}>
              Sign in to continue
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: theme === 'dark' ? '#d1d5db' : '#374151', marginBottom: '8px', fontSize: '14px' }}>
                  User ID
                </label>
                <input
                  type="text"
                  value={credentials.id}
                  onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Enter your user ID"
                  required
                  style={inputStyle}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: theme === 'dark' ? '#d1d5db' : '#374151', marginBottom: '8px', fontSize: '14px' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                  style={inputStyle}
                />
              </div>
              
              <button type="submit" style={buttonStyle}>
                <LogIn size={16} />
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
