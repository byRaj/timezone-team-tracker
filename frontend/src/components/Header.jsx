import { useState, useEffect } from 'react';
import { Clock, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AdminPanel } from './AdminPanel';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser, logout } = useAdmin();
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const headerStyle = {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc',
    borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoIconStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#10b981',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const timeStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    backgroundColor: theme === 'dark' ? '#374151' : '#e2e8f0',
    padding: '4px 12px',
    borderRadius: '20px',
    gap: '8px'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: theme === 'dark' ? '#d1d5db' : '#374151',
    backgroundColor: theme === 'dark' ? '#374151' : '#e2e8f0',
    padding: '8px 12px',
    borderRadius: '8px'
  };

  const userAvatarStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const adminBadgeStyle = {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const actionButtonStyle = {
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
    backgroundColor: theme === 'dark' ? '#374151' : '#f1f5f9',
    color: theme === 'dark' ? '#d1d5db' : '#374151',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              <User size={20} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: theme === 'dark' ? '#ffffff' : '#1e293b' }}>
              Team Tracker
            </h1>
          </div>
          <div style={timeStyle}>
            <Clock size={16} />
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {currentUser && (
            <div style={userInfoStyle}>
              <div style={userAvatarStyle}>
                <User size={12} color="white" />
              </div>
              <span style={{ fontWeight: '500' }}>{currentUser.name}</span>
              {currentUser.role === 'admin' && (
                <span style={adminBadgeStyle}>Admin</span>
              )}
            </div>
          )}
          <AdminPanel />
          <button onClick={logout} style={actionButtonStyle}>
            <LogOut size={16} />
            Logout
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
