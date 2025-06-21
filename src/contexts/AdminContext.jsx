
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AdminContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API functions
const api = {
  getTeamMembers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch team members');
    return response.json();
  },
  
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/users/me`);
    if (!response.ok) throw new Error('Failed to fetch current user');
    return response.json();
  },
  
  createTeamMember: async (memberData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });
    if (!response.ok) throw new Error('Failed to create team member');
    return response.json();
  },
  
  updateTeamMember: async (memberId, updates) => {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update team member');
    return response.json();
  },
  
  deleteTeamMember: async (memberId) => {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete team member');
    return response.json();
  }
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load team members on mount, but don't auto-authenticate
  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const members = await api.getTeamMembers();
      console.log('Loaded team members:', members);
      setTeamMembers(members);
    } catch (error) {
      console.error('Failed to load team members:', error);
      toast.error('Failed to load team data');
    } finally {
      setLoading(false);
    }
  };

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const [members, user] = await Promise.all([
        api.getTeamMembers(),
        api.getCurrentUser()
      ]);
      
      console.log('Loaded team members:', members);
      console.log('Loaded current user:', user);
      
      setTeamMembers(members);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsAdminMode(user.role === 'admin');
    } catch (error) {
      console.error('Failed to load team data:', error);
      toast.error('Failed to load team data');
    } finally {
      setLoading(false);
    }
  };

  const login = async (userId, password) => {
    try {
      // For demo purposes, we'll check if the userId matches any team member's email or name
      // and use a simple password check (in production, this would be handled by the backend)
      const user = teamMembers.find(member => 
        member.email === userId || 
        member.name.toLowerCase() === userId.toLowerCase() ||
        member._id === userId
      );
      
      if (user && password === 'admin') { // Simple demo password
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsAdminMode(user.role === 'admin');
        toast.success(`Welcome, ${user.name}!`);
        return true;
      } else if (user) {
        toast.error('Invalid password');
        return false;
      } else {
        toast.error('User not found');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdminMode(false);
    toast.success('Logged out successfully');
  };

  const addPerson = async (personData) => {
    try {
      console.log('Adding person to MongoDB:', personData);
      const newMember = await api.createTeamMember(personData);
      console.log('Created member:', newMember);
      
      setTeamMembers(prev => [...prev, newMember]);
      toast.success(`${personData.name} has been added to the team`);
      
      // Reload team data to ensure consistency
      await loadTeamMembers();
    } catch (error) {
      console.error('Failed to add person:', error);
      toast.error('Failed to add team member');
    }
  };

  const addTeamMember = async (memberData) => {
    await addPerson(memberData);
  };

  const removeTeamMember = async (memberId) => {
    try {
      await api.deleteTeamMember(memberId);
      const member = teamMembers.find(m => m._id === memberId);
      setTeamMembers(prev => prev.filter(member => member._id !== memberId));
      toast.success(`${member?.name} has been removed from the team`);
    } catch (error) {
      console.error('Failed to remove team member:', error);
      toast.error('Failed to remove team member');
    }
  };

  const updateTeamMember = async (memberId, updates) => {
    try {
      const updatedMember = await api.updateTeamMember(memberId, updates);
      setTeamMembers(prev => 
        prev.map(member => 
          member._id === memberId 
            ? { ...member, ...updates, lastUpdated: new Date() }
            : member
        )
      );
    } catch (error) {
      console.error('Failed to update team member:', error);
      toast.error('Failed to update team member');
    }
  };

  const toggleAdminMode = () => {
    if (currentUser?.role === 'admin') {
      setIsAdminMode(prev => !prev);
      toast.info(isAdminMode ? 'Admin mode disabled' : 'Admin mode enabled');
    } else {
      toast.error('Only administrators can enable admin mode');
    }
  };

  // Legacy functions for backward compatibility
  const addUserCredential = () => {
    toast.info('User credentials are now managed through MongoDB');
  };

  const removeUserCredential = () => {
    toast.info('User credentials are now managed through MongoDB');
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
      userCredentials: [], // Empty for backward compatibility
      addUserCredential,
      removeUserCredential,
      addPerson,
      currentUser,
      isAuthenticated,
      login,
      logout,
      loading,
      loadTeamData,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
