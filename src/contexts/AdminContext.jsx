
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
  const [userCredentials, setUserCredentials] = useState([
    // Default admin account
    { id: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userId, password) => {
    const user = userCredentials.find(cred => cred.id === userId && cred.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      if (user.role === 'admin') {
        setIsAdminMode(true);
      }
      toast.success(`Welcome, ${user.name}!`);
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdminMode(false);
    toast.success('Logged out successfully');
  };

  const addUserCredential = (credentialData) => {
    const newCredential = {
      ...credentialData,
      role: credentialData.role || 'member'
    };
    
    setUserCredentials(prev => [...prev, newCredential]);
    toast.success(`User credentials created for ${credentialData.name}`);
  };

  const removeUserCredential = (userId) => {
    const user = userCredentials.find(cred => cred.id === userId);
    setUserCredentials(prev => prev.filter(cred => cred.id !== userId));
    toast.success(`User credentials removed for ${user?.name}`);
  };

  const addTeamMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: Date.now().toString(),
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
    if (currentUser?.role === 'admin') {
      setIsAdminMode(prev => !prev);
      toast.info(isAdminMode ? 'Admin mode disabled' : 'Admin mode enabled');
    } else {
      toast.error('Only administrators can enable admin mode');
    }
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
      userCredentials,
      addUserCredential,
      removeUserCredential,
      currentUser,
      isAuthenticated,
      login,
      logout,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
