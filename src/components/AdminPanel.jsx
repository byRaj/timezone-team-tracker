import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserPlus, Users, Trash2 } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useTheme } from '../contexts/ThemeContext';
import { AddPersonForm } from './AddPersonForm';

const TeamMembersList = () => {
  const { teamMembers, removeTeamMember } = useAdmin();
  const { theme } = useTheme();

  const handleRemoveMember = (member) => {
    // Use _id for MongoDB documents
    removeTeamMember(member._id);
  };

  const memberItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
    borderRadius: '8px',
    marginBottom: '8px'
  };

  const memberInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const memberNameStyle = {
    fontWeight: '500',
    color: theme === 'dark' ? '#ffffff' : '#111827'
  };

  const memberRoleStyle = {
    fontSize: '14px',
    color: theme === 'dark' ? '#9ca3af' : '#6b7280'
  };

  const memberLocationStyle = {
    fontSize: '12px',
    color: theme === 'dark' ? '#6b7280' : '#9ca3af'
  };

  const removeButtonStyle = {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={{ maxHeight: '384px', overflowY: 'auto' }}>
      {teamMembers.map(member => (
        <div key={member._id} style={memberItemStyle}>
          <div style={memberInfoStyle}>
            {member.avatar && (
              <img src={member.avatar} alt={member.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            )}
            <div>
              <div style={memberNameStyle}>{member.name}</div>
              <div style={memberRoleStyle}>{member.role}</div>
              {member.location && (
                <div style={memberLocationStyle}>{member.location}</div>
              )}
            </div>
          </div>
          <button
            onClick={() => handleRemoveMember(member)}
            style={removeButtonStyle}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const AdminPanel = () => {
  const { isAdminMode, addPerson, currentUser } = useAdmin();
  const { theme } = useTheme();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  if (!isAdminMode || currentUser?.role !== 'admin') {
    return null;
  }

  const buttonStyle = {
    backgroundColor: '#059669',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const outlineButtonStyle = {
    backgroundColor: 'transparent',
    color: theme === 'dark' ? '#d1d5db' : '#374151',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <button style={buttonStyle}>
            <UserPlus size={16} />
            Add Person
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Person</DialogTitle>
          </DialogHeader>
          <AddPersonForm 
            onAdd={addPerson} 
            onClose={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Sheet open={isManageSheetOpen} onOpenChange={setIsManageSheetOpen}>
        <SheetTrigger asChild>
          <button style={outlineButtonStyle}>
            <Users size={16} />
            Manage Team
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Team Members</SheetTitle>
          </SheetHeader>
          <div style={{ marginTop: '24px' }}>
            <TeamMembersList />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
