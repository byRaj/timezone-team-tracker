
import { useState, useEffect } from 'react';
import { Clock, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AdminPanel } from './AdminPanel';
import { Button } from '@/components/ui/button';
import { useAdmin } from '../contexts/AdminContext';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser, logout } = useAdmin();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Team Availability Tracker
            </h1>
            <div className="hidden sm:flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                    Admin
                  </span>
                )}
              </div>
            )}
            <AdminPanel />
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
