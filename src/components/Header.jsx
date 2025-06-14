
import { useState, useEffect } from 'react';
import { Clock, User, LogOut, Menu } from 'lucide-react';
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
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Team Tracker
              </h1>
            </div>
            <div className="hidden sm:flex items-center text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentUser && (
              <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-700 px-3 py-2 rounded-lg">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="hidden sm:inline font-medium">{currentUser.name}</span>
                {currentUser.role === 'admin' && (
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Admin
                  </span>
                )}
              </div>
            )}
            <AdminPanel />
            <Button 
              onClick={logout} 
              variant="outline" 
              size="sm"
              className="border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
            >
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
