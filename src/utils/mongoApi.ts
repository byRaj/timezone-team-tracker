
// MongoDB API integration utilities
// These functions would connect to your external MongoDB API

export interface MongoTeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'available' | 'busy' | 'in-meeting' | 'offline';
  timezone: string;
  location: string;
  workingHours: {
    start: string;
    end: string;
  };
  lastUpdated: Date;
}

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

// GET all team members
export const fetchTeamMembers = async (): Promise<MongoTeamMember[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if using JWT
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// UPDATE team member status
export const updateMemberStatus = async (
  memberId: string, 
  status: MongoTeamMember['status']
): Promise<MongoTeamMember> => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members/${memberId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if using JWT
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status, lastUpdated: new Date() })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update member status');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating member status:', error);
    throw error;
  }
};

// CREATE new team member
export const createTeamMember = async (memberData: Omit<MongoTeamMember, '_id' | 'lastUpdated'>): Promise<MongoTeamMember> => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if using JWT
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...memberData,
        lastUpdated: new Date()
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create team member');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

// UPDATE team member working hours
export const updateWorkingHours = async (
  memberId: string,
  workingHours: { start: string; end: string }
): Promise<MongoTeamMember> => {
  try {
    const response = await fetch(`${API_BASE_URL}/team-members/${memberId}/working-hours`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if using JWT
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ workingHours })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update working hours');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating working hours:', error);
    throw error;
  }
};

// WebSocket connection for real-time updates
export const connectToWebSocket = (onStatusUpdate: (data: { memberId: string; status: string }) => void) => {
  const WS_URL = process.env.VITE_WS_URL || 'ws://localhost:3001';
  const socket = new WebSocket(WS_URL);
  
  socket.onopen = () => {
    console.log('Connected to WebSocket');
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'status-update') {
        onStatusUpdate(data.payload);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log('WebSocket connection closed');
    // Attempt to reconnect after 3 seconds
    setTimeout(() => connectToWebSocket(onStatusUpdate), 3000);
  };
  
  return socket;
};
