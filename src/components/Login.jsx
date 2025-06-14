
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '../contexts/AdminContext';
import { LogIn, Users } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Team Availability Tracker</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access your team dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
              <Input
                type="text"
                value={credentials.id}
                onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                placeholder="Enter your user ID"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Default admin credentials:</p>
            <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
              ID: admin | Password: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
