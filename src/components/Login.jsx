
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '../contexts/AdminContext';
import { LogIn, Shield } from 'lucide-react';

export const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const { login } = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.id || !credentials.password) {
      return;
    }
    login(credentials.id, credentials.password);
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
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
    color: '#ffffff',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    color: '#94a3b8'
  };

  const inputStyle = {
    backgroundColor: '#374151',
    border: '1px solid #4b5563',
    color: '#ffffff',
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
            <h2 style={{ fontSize: '20px', color: '#ffffff', textAlign: 'center', marginBottom: '24px' }}>
              Sign in to continue
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '8px', fontSize: '14px' }}>
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
                <label style={{ display: 'block', color: '#d1d5db', marginBottom: '8px', fontSize: '14px' }}>
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
