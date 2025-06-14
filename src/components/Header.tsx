
import { Users, Clock } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Availability Tracker</h1>
              <p className="text-gray-600">Stay connected with your team's status</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-medium">
              {new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
