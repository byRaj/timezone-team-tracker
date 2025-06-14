import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserPlus, Users, Trash2, Settings } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { UserManagement } from './UserManagement';

const AddMemberForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar: '',
    status: 'available',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    location: '',
    workingHours: { start: 9, end: 17 }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      return;
    }
    
    onAdd(formData);
    setFormData({
      name: '',
      role: '',
      avatar: '',
      status: 'available',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: '',
      workingHours: { start: 9, end: 17 }
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter name"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Role *</label>
        <Input
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          placeholder="Enter role"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Avatar URL</label>
        <Input
          value={formData.avatar}
          onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Location</label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="City, Country"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Timezone</label>
        <Input
          value={formData.timezone}
          onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
          placeholder="America/New_York"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Start Hour (24h)</label>
          <Input
            type="number"
            min="0"
            max="23"
            value={formData.workingHours.start}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, start: parseInt(e.target.value) }
            }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium">End Hour (24h)</label>
          <Input
            type="number"
            min="0"
            max="23"
            value={formData.workingHours.end}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, end: parseInt(e.target.value) }
            }))}
          />
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const TeamMembersList = () => {
  const { teamMembers, removeTeamMember } = useAdmin();

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {teamMembers.map(member => (
        <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            {member.avatar && (
              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
            )}
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-gray-500">{member.role}</div>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeTeamMember(member.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export const AdminPanel = () => {
  const { isAdminMode, toggleAdminMode, addTeamMember, currentUser } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  if (!isAdminMode || currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex gap-2">
      <UserManagement />
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
          </DialogHeader>
          <AddMemberForm 
            onAdd={addTeamMember} 
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isManageSheetOpen} onOpenChange={setIsManageSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Manage Team
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Team Members</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <TeamMembersList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
