
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserPlus, Users, Trash2, Key } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const AddUserForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    name: '',
    role: 'member'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.password || !formData.name) {
      return;
    }
    
    onAdd(formData);
    setFormData({
      id: '',
      password: '',
      name: '',
      role: 'member'
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">User ID *</label>
        <Input
          value={formData.id}
          onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
          placeholder="Enter unique user ID"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Password *</label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Enter password"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Full Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Create User
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const UsersList = () => {
  const { userCredentials, removeUserCredential } = useAdmin();

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {userCredentials.map(user => (
        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">ID: {user.id} | Role: {user.role}</div>
          </div>
          {user.id !== 'admin' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeUserCredential(user.id)}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export const UserManagement = () => {
  const { addUserCredential } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Key className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User Account</DialogTitle>
          </DialogHeader>
          <AddUserForm 
            onAdd={addUserCredential} 
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isManageSheetOpen} onOpenChange={setIsManageSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage User Accounts</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <UsersList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
