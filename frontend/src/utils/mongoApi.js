
// MongoDB API integration utilities
// This file provides functions to interact with your MongoDB backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const MONGODB_URI = "mongodb+srv://Status:raj7214@atlascluster.apm2n.mongodb.net/";

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'MongoDB-URI': MONGODB_URI,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// User management functions
export const userApi = {
  // Get all team members
  getTeamMembers: () => apiRequest('/users'),
  
  // Get current user
  getCurrentUser: () => apiRequest('/users/me'),
  
  // Update user status
  updateStatus: (userId, status) => 
    apiRequest(`/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
  
  // Update user working hours
  updateWorkingHours: (userId, workingHours) =>
    apiRequest(`/users/${userId}/working-hours`, {
      method: 'PUT',
      body: JSON.stringify({ workingHours }),
    }),
  
  // Create new user
  createUser: (userData) =>
    apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Update user timezone
  updateTimezone: (userId, timezone) =>
    apiRequest(`/users/${userId}/timezone`, {
      method: 'PUT',
      body: JSON.stringify({ timezone }),
    }),

  // Test MongoDB connection
  testConnection: () => apiRequest('/test-connection'),
};

// WebSocket connection for real-time updates
export class WebSocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(userId) {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
    this.socket = new WebSocket(`${wsUrl}?userId=${userId}`);
    
    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      // Implement reconnection logic if needed
      setTimeout(() => this.connect(userId), 3000);
    };
    
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(callback => callback(payload));
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  unsubscribe(eventType, callback) {
    const listeners = this.listeners.get(eventType) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  sendMessage(type, payload) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// React hook for using the WebSocket manager
// NOTE: Import React hooks in your component file if using this
// export const useWebSocket = (userId) => {
//   const [wsManager] = useState(() => new WebSocketManager());
//   
//   useEffect(() => {
//     if (userId) {
//       wsManager.connect(userId);
//     }
//     
//     return () => {
//       wsManager.disconnect();
//     };
//   }, [userId, wsManager]);
//   
//   return wsManager;
// };

// Integration with React state management
// NOTE: Import React hooks in your component file if using this
// export const useTeamData = () => {
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  // Note: Implement hooks in your component file when needed
// };

// MongoDB connection test utility
// Use this function directly in components with React hooks
export const testMongoConnection = async () => {
  try {
    const result = await userApi.testConnection();
    console.log('MongoDB connection successful:', result);
    return { isConnected: true, error: null, result };
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    return { isConnected: false, error: error.message, result: null };
  }
};
