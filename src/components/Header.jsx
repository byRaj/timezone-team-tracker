
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AdminPanel } from './AdminPanel';

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
            <AdminPanel />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
