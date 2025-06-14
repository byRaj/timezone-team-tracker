import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { mockUsers, mockCredentials } from '../data/mockData';

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within a AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState(() => {
    const storedMembers = localStorage.getItem('teamMembers');
    return storedMembers ? JSON.parse(storedMembers) : mockUsers;
  });
  const [userCredentials, setUserCredentials] = useState(() => {
    const storedCredentials = localStorage.getItem('userCredentials');
    return storedCredentials ? JSON.parse(storedCredentials) : mockCredentials;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
  }, [userCredentials]);

  const login = (id, password) => {
    const user = userCredentials.find(user => user.id === id && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      const memberData = teamMembers.find(member => member.id === id);
      setCurrentUser(memberData);
      setIsAdminMode(memberData?.role === 'admin');
      toast.success(`Logged in as ${memberData.name}`);
    } else {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdminMode(false);
    toast.success('Logged out successfully');
  };

  const addPerson = (person) => {
    const newPerson = { ...person, id: uuidv4() };
    setTeamMembers(prev => [...prev, newPerson]);
    setUserCredentials(prev => [...prev, { id: newPerson.id, password: person.password }]);
    toast.success(`${person.name} added successfully`);
  };

  const updateTeamMember = useCallback((id, updates) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  }, []);

  const removeTeamMember = (id) => {
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
    toast.success('Team member removed');
  };

  const removeUserCredential = (id) => {
    setUserCredentials(prevCredentials => prevCredentials.filter(user => user.id !== id));
  };

  const value = {
    teamMembers,
    userCredentials,
    isAuthenticated,
    currentUser,
    isAdminMode,
    login,
    logout,
    addPerson,
    updateTeamMember,
    removeTeamMember,
    removeUserCredential
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
