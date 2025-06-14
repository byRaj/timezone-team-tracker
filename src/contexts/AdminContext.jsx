
import React, { createContext, useContext, useState } from 'react';
import { mockTeamMembers } from '../data/mockData';
import { toast } from 'sonner';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);

  const addTeamMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now().toString(), // Simple ID generation
      lastUpdated: new Date(),
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    toast.success(`${memberData.name} has been added to the team`);
  };

  const removeTeamMember = (memberId) => {
    const member = teamMembers.find(m => m.id === memberId);
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast.success(`${member?.name} has been removed from the team`);
  };

  const updateTeamMember = (memberId, updates) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, ...updates, lastUpdated: new Date() }
          : member
      )
    );
  };

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
    toast.info(isAdminMode ? 'Admin mode disabled' : 'Admin mode enabled');
  };

  return (
    <AdminContext.Provider value={{
      isAdminMode,
      teamMembers,
      setTeamMembers,
      addTeamMember,
      removeTeamMember,
      updateTeamMember,
      toggleAdminMode,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
