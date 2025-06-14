
# Team Availability Tracker

A full-stack real-time team availability tracking application built with React, Node.js, Express, MongoDB, and Socket.IO. Keep track of your team members' status, timezone, and working hours in a beautiful, responsive interface with real-time updates.

## Features

- 🟢 **Real-time Status Updates**: Live status tracking with Socket.IO WebSocket implementation
- 🌍 **Timezone Awareness**: Automatic timezone detection and local time display
- ⏰ **Working Hours**: Configurable working hours per team member
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS and shadcn/ui components
- 📱 **Mobile Friendly**: Fully responsive across all devices
- 📊 **Team Overview**: Dashboard showing team status distribution
- 🗄️ **MongoDB Integration**: Persistent data storage with MongoDB
- 🔐 **Admin Panel**: Add, manage, and remove team members
- 🌙 **Dark/Light Theme**: Toggle between dark and light themes
- 👥 **User Authentication**: Login system with admin privileges

## Status Types

- **Available**: Ready for collaboration
- **Do Not Disturb**: Focused work, minimal interruptions
- **In a Meeting**: Currently in a meeting or call
- **Offline**: Not currently working

## Tech Stack

### Frontend
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Lucide React** for icons
- **Vite** as build tool
- **Socket.IO Client** for real-time communication
- **React Query** for data fetching and caching

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time WebSocket communication
- **CORS** enabled for cross-origin requests
- **Environment variables** for configuration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd team-availability-tracker
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

4. **Set up MongoDB:**
   - **Local MongoDB:** Make sure MongoDB is running on your local machine
   ```bash
   mongod
   ```
   - **MongoDB Atlas:** Update the connection string in `backend/.env`

5. **Configure environment variables:**
   The backend `.env` file is pre-configured for local development:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/team-tracker
   CORS_ORIGIN=http://localhost:5173
   NODE_ENV=development
   ```

6. **Seed the database (optional):**
```bash
cd backend
node scripts/seed.js
cd ..
```

7. **Start the backend server:**
```bash
cd backend
npm run dev
```

8. **Start the frontend development server:**
```bash
npm run dev
```

9. **Open your browser and navigate to `http://localhost:5173`**

## Usage

1. **Login**: Use the login system to access the application
2. **Set Your Status**: Use the status selector to update your current availability
3. **View Team Members**: See all team members with their current status, local time, and working hours
4. **Real-time Updates**: Watch as team members' statuses update automatically across all connected clients
5. **Admin Features**: If you're an admin, you can add new team members and manage the team
6. **Theme Toggle**: Switch between dark and light themes using the theme toggle button

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

The server emits the following Socket.IO events:
- `status-update` - When a team member's status changes
- `member-added` - When a new team member is added
- `member-removed` - When a team member is deleted

## Project Structure

```
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.jsx       # App header with navigation
│   │   ├── TeamMemberCard.jsx # Individual team member display
│   │   ├── StatusBadge.jsx  # Status indicator component
│   │   ├── StatusSelector.jsx # Status selection interface
│   │   ├── AdminPanel.jsx   # Admin management interface
│   │   ├── AddPersonForm.jsx # Form for adding new members
│   │   ├── Login.jsx        # Authentication component
│   │   └── ThemeToggle.jsx  # Dark/light theme toggle
│   ├── contexts/            # React contexts
│   │   ├── AdminContext.jsx # Admin state management
│   │   └── ThemeContext.jsx # Theme state management
│   ├── data/
│   │   └── mockData.js      # Mock data and initial setup
│   ├── utils/
│   │   ├── timeUtils.js     # Timezone and time utilities
│   │   └── mongoApi.js      # API communication utilities
│   └── pages/
│       ├── Index.jsx        # Main application page
│       └── NotFound.jsx     # 404 error page
├── backend/                  # Backend source code
│   ├── models/
│   │   └── TeamMember.js    # MongoDB schema for team members
│   ├── routes/
│   │   ├── teamMembers.js   # Team member API routes
│   │   └── connection.js    # Database connection testing
│   ├── scripts/
│   │   └── seed.js          # Database seeding script
│   ├── server.js            # Express server with Socket.IO
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
└── README.md                # Project documentation
```

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

### Frontend Development
- Frontend runs on `http://localhost:5173`
- Uses Vite for fast development and hot reloading
- Configured with Tailwind CSS and shadcn/ui components

### Backend Development
- Backend runs on `http://localhost:5000`
- Uses nodemon for automatic server restarts
- Real-time updates handled through Socket.IO

### Database Development
- MongoDB connection configured for local development
- Seeding script available to populate initial data
- Mongoose ODM for schema validation and data modeling

## Production Deployment

1. **Build the frontend:**
```bash
npm run build
```

2. **Set production environment variables:**
   - Update `MONGODB_URI` to your production MongoDB instance
   - Update `CORS_ORIGIN` to your production frontend URL
   - Set `NODE_ENV=production`

3. **Deploy backend and frontend to your preferred hosting service**

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and modern web technologies
- UI components powered by shadcn/ui
- Real-time functionality enabled by Socket.IO
- Database powered by MongoDB
