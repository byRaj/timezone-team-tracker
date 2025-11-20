import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AdminContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Default fallback admin user for when API is unavailable
const DEFAULT_ADMIN = {
  _id: 'default-admin',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  status: 'available',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  lastUpdated: new Date()
};

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
  const [teamMembers, setTeamMembers] = useState([DEFAULT_ADMIN]); // Start with fallback admin
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(false);

  // Load team members on mount
  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      console.log('Attempting to load team members from API...');
      const members = await api.getTeamMembers();
      console.log('Loaded team members from API:', members);
      
      // Ensure working hours are properly formatted
      const formattedMembers = members.map(member => ({
        ...member,
        workingHours: {
          start: member.workingHours?.start || '09:00',
          end: member.workingHours?.end || '17:00'
        },
        lastUpdated: member.lastUpdated ? new Date(member.lastUpdated) : new Date()
      }));
      
      // Check if DEFAULT_ADMIN exists in the members list
      const hasDefaultAdmin = formattedMembers.some(m => m._id === DEFAULT_ADMIN._id);
      
      // If no admin user exists in DB, prepend DEFAULT_ADMIN for login purposes
      if (!hasDefaultAdmin && formattedMembers.length > 0) {
        setTeamMembers([DEFAULT_ADMIN, ...formattedMembers]);
      } else {
        setTeamMembers(formattedMembers.length > 0 ? formattedMembers : [DEFAULT_ADMIN]);
      }
      
      setIsApiAvailable(true);
    } catch (error) {
      console.error('Failed to load team members:', error);
      console.log('Using fallback admin user');
      // Use fallback admin user when API is unavailable
      setTeamMembers([DEFAULT_ADMIN]);
      setIsApiAvailable(false);
      toast.error('API unavailable - using demo admin user');
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
      
      // Ensure working hours are properly formatted
      const formattedMembers = members.map(member => ({
        ...member,
        workingHours: {
          start: member.workingHours?.start || '09:00',
          end: member.workingHours?.end || '17:00'
        },
        lastUpdated: member.lastUpdated ? new Date(member.lastUpdated) : new Date()
      }));
      
      setTeamMembers(formattedMembers);
      setCurrentUser({
        ...user,
        workingHours: {
          start: user.workingHours?.start || '09:00',
          end: user.workingHours?.end || '17:00'
        },
        lastUpdated: user.lastUpdated ? new Date(user.lastUpdated) : new Date()
      });
      setIsAuthenticated(true);
      setIsAdminMode(user.role === 'admin');
      setIsApiAvailable(true);
    } catch (error) {
      console.error('Failed to load team data:', error);
      toast.error('Failed to load team data');
      setIsApiAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userId, password) => {
    try {
      console.log('Attempting login for:', userId);
      console.log('Available team members:', teamMembers);
      console.log('Team members length:', teamMembers.length);
      console.log('Is API available:', isApiAvailable);
      
      // If API is not available or team members list is empty, use DEFAULT_ADMIN
      let searchMembers = teamMembers.length > 0 ? teamMembers : [DEFAULT_ADMIN];
      
      // For demo purposes, we'll check if the userId matches any team member's email or name
      // and use a simple password check (in production, this would be handled by the backend)
      const user = searchMembers.find(member => 
        member.email === userId || 
        member.name.toLowerCase() === userId.toLowerCase() ||
        member._id === userId
      );
      
      console.log('Found user:', user);
      
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
      console.log('Adding person:', personData);
      
      // Validate required fields
      if (!personData.name || !personData.email || !personData.location || !personData.timezone) {
        toast.error('Missing required fields: name, email, location, and timezone');
        return false;
      }
      
      // Ensure the person has all required fields including workingHours
      const completePersonData = {
        ...personData,
        workingHours: personData.workingHours || {
          start: '09:00',
          end: '17:00'
        },
        lastUpdated: new Date()
      };
      
      if (isApiAvailable) {
        console.log('Adding person to MongoDB:', completePersonData);
        try {
          const newMember = await api.createTeamMember(completePersonData);
          console.log('Created member:', newMember);
          
          const formattedMember = {
            ...newMember,
            workingHours: {
              start: newMember.workingHours?.start || '09:00',
              end: newMember.workingHours?.end || '17:00'
            },
            lastUpdated: newMember.lastUpdated ? new Date(newMember.lastUpdated) : new Date()
          };
          
          setTeamMembers(prev => [...prev, formattedMember]);
          toast.success(`${personData.name} has been added to the team`);
          return true;
        } catch (apiError) {
          console.error('API error when creating member:', apiError);
          // Fallback to local addition if API fails
          const newMember = {
            ...completePersonData,
            _id: `local-${Date.now()}`
          };
          
          setTeamMembers(prev => [...prev, newMember]);
          toast.success(`${personData.name} has been added locally (API error)`);
          return true;
        }
      } else {
        console.log('API unavailable, adding person locally:', completePersonData);
        // Add to local state when API is unavailable
        const newMember = {
          ...completePersonData,
          _id: `local-${Date.now()}`
        };
        
        setTeamMembers(prev => [...prev, newMember]);
        toast.success(`${personData.name} has been added locally (API unavailable)`);
        return true;
      }
    } catch (error) {
      console.error('Failed to add person:', error);
      toast.error(`Error adding member: ${error.message}`);
      return false;
    }
  };

  const addTeamMember = async (memberData) => {
    await addPerson(memberData);
  };

  const removeTeamMember = async (memberId) => {
    try {
      if (isApiAvailable) {
        await api.deleteTeamMember(memberId);
      }
      
      const member = teamMembers.find(m => m._id === memberId);
      setTeamMembers(prev => prev.filter(member => member._id !== memberId));
      toast.success(`${member?.name} has been removed from the team`);
    } catch (error) {
      console.error('Failed to remove team member:', error);
      // Still remove locally even if API fails
      const member = teamMembers.find(m => m._id === memberId);
      setTeamMembers(prev => prev.filter(member => member._id !== memberId));
      toast.success(`${member?.name} has been removed locally`);
    }
  };

  const updateTeamMember = async (memberId, updates) => {
    try {
      if (isApiAvailable) {
        const updatedMember = await api.updateTeamMember(memberId, updates);
      }
      
      setTeamMembers(prev => 
        prev.map(member => 
          member._id === memberId 
            ? { ...member, ...updates, lastUpdated: new Date() }
            : member
        )
      );
    } catch (error) {
      console.error('Failed to update team member:', error);
      // Still update locally even if API fails
      setTeamMembers(prev => 
        prev.map(member => 
          member._id === memberId 
            ? { ...member, ...updates, lastUpdated: new Date() }
            : member
        )
      );
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
      isApiAvailable,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
