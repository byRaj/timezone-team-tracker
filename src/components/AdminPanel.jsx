
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserPlus, Users, Trash2 } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { AddPersonForm } from './AddPersonForm';

const TeamMembersList = () => {
  const { teamMembers, removeTeamMember, removeUserCredential } = useAdmin();

  const handleRemoveMember = (member) => {
    removeTeamMember(member.id);
    // Also remove user credentials if they exist
    removeUserCredential(member.id);
  };

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
              {member.location && (
                <div className="text-xs text-gray-400">{member.location}</div>
              )}
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemoveMember(member)}
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
  const { isAdminMode, addPerson, currentUser } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageSheetOpen, setIsManageSheetOpen] = useState(false);

  if (!isAdminMode || currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Person
          </Button>
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
