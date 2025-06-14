
import { useState, useEffect } from 'react';
import { Clock, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AdminPanel } from './AdminPanel';
import { useAdmin } from '../contexts/AdminContext';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser } = useAdmin();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Team Availability Tracker
            </h1>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-1" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4" />
                <span>{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    Admin
                  </span>
                )}
              </div>
            )}
            <AdminPanel />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
