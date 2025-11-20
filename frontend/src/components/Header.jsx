
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdminPanel } from './AdminPanel';
import { ThemeToggle } from './ThemeToggle';
import DownloadProject from './DownloadProject';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import { UserCircle, Settings, LogOut } from 'lucide-react';

export const Header = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { isAuthenticated, currentUser, logout, isAdminMode } = useAdmin();
  const { theme } = useTheme();

  const headerStyle = {
    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
    borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#e2e8f0'}`,
    padding: '16px 0'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#1e293b'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: theme === 'dark' ? '#e2e8f0' : '#374151'
  };

  if (!isAuthenticated) {
    return (
      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>Team Availability Tracker</h1>
          <div style={rightSectionStyle}>
            <DownloadProject />
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>Team Availability Tracker</h1>
          
          <div style={rightSectionStyle}>
            {currentUser && (
              <div style={userInfoStyle}>
                <UserCircle className="h-5 w-5" />
                <span>{currentUser.name}</span>
              </div>
            )}
            
            <DownloadProject />
            
            {currentUser?.role === 'admin' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {showAdminPanel && isAdminMode && currentUser?.role === 'admin' && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};
