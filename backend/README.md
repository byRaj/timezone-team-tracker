
# Team Tracker Backend

Express.js backend with MongoDB for the Team Availability Tracker application.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```bash
   # Using MongoDB Community Edition
   mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Environment Variables**
   The `.env` file is already configured for local development:
   - `PORT=5000`
   - `MONGODB_URI=mongodb://localhost:27017/team-tracker`
   - `CORS_ORIGIN=http://localhost:5173`

4. **Seed the Database (Optional)**
   ```bash
   node scripts/seed.js
   ```

5. **Start the Server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Team Members
- `GET /api/users` - Get all team members
- `GET /api/users/me` - Get current user
- `POST /api/users` - Create new team member
- `PUT /api/users/:id/status` - Update member status
- `PUT /api/users/:id/working-hours` - Update working hours
- `PUT /api/users/:id/timezone` - Update timezone
- `DELETE /api/users/:id` - Delete team member

### Connection
- `GET /api/test-connection` - Test MongoDB connection

## WebSocket Events

The server emits the following events:
- `status-update` - When a team member's status changes
- `member-added` - When a new team member is added
- `member-removed` - When a team member is deleted

## MongoDB Schema

Team members are stored with the following structure:
```javascript
{
  name: String,
  email: String (unique),
  role: String,
  avatar: String,
  status: ['available', 'busy', 'in-meeting', 'offline'],
  timezone: String,
  location: String,
  workingHours: {
    start: String,
    end: String
  },
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Development

The server runs on `http://localhost:5000` by default and accepts requests from `http://localhost:5173` (your React app).

Real-time updates are handled through Socket.IO for instant status changes across all connected clients.
