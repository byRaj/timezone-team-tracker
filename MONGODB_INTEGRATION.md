
# MongoDB Integration Guide

This document explains how to integrate the Team Availability Tracker with a MongoDB backend.

## Backend Setup Requirements

### 1. Create Express.js Server with MongoDB

```bash
mkdir team-tracker-backend
cd team-tracker-backend
npm init -y
npm install express mongoose cors dotenv socket.io jsonwebtoken bcryptjs
npm install -D nodemon @types/node typescript
```

### 2. Environment Variables (.env)

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/team-tracker
JWT_SECRET=your-jwt-secret-here
CORS_ORIGIN=http://localhost:5173
```

### 3. MongoDB Schema

```javascript
// models/TeamMember.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['available', 'busy', 'in-meeting', 'offline'],
    default: 'offline'
  },
  timezone: { type: String, required: true },
  location: { type: String, required: true },
  workingHours: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
```

### 4. API Endpoints

```javascript
// routes/teamMembers.js
const express = require('express');
const TeamMember = require('../models/TeamMember');
const router = express.Router();

// GET all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH update member status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { status, lastUpdated: new Date() },
      { new: true }
    );
    
    // Emit WebSocket event
    req.app.get('io').emit('status-update', {
      memberId: member._id,
      status: member.status
    });
    
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new member
router.post('/', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 5. Server Setup with Socket.IO

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN }
});

// Middleware
app.use(cors());
app.use(express.json());
app.set('io', io);

// Routes
app.use('/api/team-members', require('./routes/teamMembers'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Frontend Integration

### 1. Environment Variables

Create a `.env` file in your React app root:

```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

### 2. Using the MongoDB API

The `mongoApi.ts` utility file provides functions to interact with your MongoDB backend:

```typescript
import { fetchTeamMembers, updateMemberStatus } from './utils/mongoApi';

// In your React component
const [teamMembers, setTeamMembers] = useState([]);

useEffect(() => {
  const loadTeamMembers = async () => {
    try {
      const members = await fetchTeamMembers();
      setTeamMembers(members);
    } catch (error) {
      console.error('Failed to load team members:', error);
    }
  };
  
  loadTeamMembers();
}, []);

const handleStatusChange = async (memberId: string, newStatus: string) => {
  try {
    await updateMemberStatus(memberId, newStatus);
    // Update local state or refetch data
  } catch (error) {
    console.error('Failed to update status:', error);
  }
};
```

### 3. Real-time Updates

The WebSocket connection enables real-time status updates:

```typescript
import { connectToWebSocket } from './utils/mongoApi';

useEffect(() => {
  const socket = connectToWebSocket((data) => {
    // Update team member status in real-time
    setTeamMembers(prev => 
      prev.map(member => 
        member._id === data.memberId 
          ? { ...member, status: data.status }
          : member
      )
    );
  });

  return () => socket.close();
}, []);
```

## Running the Application

1. **Start MongoDB** (if running locally)
2. **Start the backend server:**
   ```bash
   cd team-tracker-backend
   npm run dev
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```

Your Team Availability Tracker will now be connected to MongoDB with real-time updates!
