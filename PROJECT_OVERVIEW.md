
# Team Availability Tracker - Project Overview

## 🚀 Project Description

The **Team Availability Tracker** is a full-stack real-time web application designed to help teams monitor and manage member availability status. It provides instant visibility into who's available, busy, in meetings, or offline, making remote team coordination seamless and efficient.

## ✨ Key Features

### 🔄 Real-time Status Updates
- **Live Status Tracking**: Team members' availability updates instantly across all connected clients
- **WebSocket Integration**: Built with Socket.IO for real-time communication
- **Automatic Sync**: Status changes propagate immediately to all users

### 👥 Team Management
- **Member Profiles**: Complete team member information with avatars, roles, and locations
- **Status Categories**: Four distinct availability states:
  - 🟢 **Available** - Ready for collaboration
  - 🔴 **Do Not Disturb** - Focused work, minimal interruptions
  - 🟡 **In a Meeting** - Currently in meetings or calls
  - ⚫ **Offline** - Not currently working

### 🌍 Timezone & Working Hours
- **Automatic Timezone Detection**: Shows local time for each team member
- **Working Hours Display**: Visual indicators for who's within their working hours
- **Global Team Support**: Perfect for distributed teams across different time zones

### 🔐 Authentication & Admin Features
- **Secure Login System**: User authentication with role-based access
- **Admin Panel**: 
  - Add new team members
  - Manage existing members
  - Remove team members
  - Bulk operations for team management

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for user preference
- **Beautiful Components**: Built with shadcn/ui for professional appearance
- **Smooth Animations**: Engaging transitions and hover effects

### 📊 Team Analytics
- **Status Overview**: Dashboard showing team availability distribution
- **Real-time Statistics**: Live counts of available, busy, meeting, and offline members
- **Visual Indicators**: Color-coded status badges and progress indicators

## 🛠️ Technology Stack

### Frontend
- **⚛️ React 18** - Modern React with hooks and functional components
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid styling
- **🧩 shadcn/ui** - High-quality, accessible component library
- **🔥 Vite** - Lightning-fast build tool and dev server
- **🌐 Socket.IO Client** - Real-time WebSocket communication
- **🔄 React Query** - Data fetching, caching, and state management
- **🎯 TypeScript** - Type-safe JavaScript development
- **🎭 Lucide React** - Beautiful, customizable icons

### Backend
- **🟢 Node.js** - JavaScript runtime environment
- **🚀 Express.js** - Fast, unopinionated web framework
- **🍃 MongoDB** - NoSQL database for flexible data storage
- **📊 Mongoose** - MongoDB object modeling for Node.js
- **🔌 Socket.IO** - Real-time bidirectional event-based communication
- **🔒 CORS** - Cross-origin resource sharing configuration

### Development Tools
- **📦 npm** - Package manager
- **🔧 ESLint** - Code linting and formatting
- **🎯 Vite** - Module bundler and dev server
- **🐳 Docker** - Containerization (optional)

## 🏗️ Architecture Overview

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.jsx      # Navigation and user info
│   ├── TeamMemberCard.jsx  # Individual member display
│   ├── StatusSelector.jsx  # Status change interface
│   └── AdminPanel.jsx  # Admin management tools
├── contexts/           # React context providers
│   ├── AdminContext.jsx    # Admin state management
│   └── ThemeContext.jsx    # Theme management
├── pages/              # Page components
│   ├── Index.jsx       # Main dashboard
│   └── Login.jsx       # Authentication page
├── utils/              # Utility functions
│   ├── timeUtils.js    # Timezone calculations
│   └── mongoApi.js     # API communication
└── data/               # Static data and types
```

### Backend Architecture
```
backend/
├── models/             # Database schemas
│   └── TeamMember.js   # MongoDB team member model
├── routes/             # API endpoint definitions
│   ├── teamMembers.js  # CRUD operations for members
│   └── connection.js   # Database connection testing
├── scripts/            # Utility scripts
│   └── seed.js         # Database seeding
└── server.js           # Express server with Socket.IO
```

## 🗄️ Database Schema

### Team Member Model
```javascript
{
  name: String,           // Full name
  email: String,          // Unique email address
  role: String,           // Job role/position
  avatar: String,         // Profile picture URL
  status: String,         // Current availability status
  timezone: String,       // User's timezone
  location: String,       // Geographic location
  workingHours: {         // Daily working schedule
    start: String,        // Start time (HH:MM)
    end: String          // End time (HH:MM)
  },
  lastUpdated: Date,      // Last status change
  createdAt: Date,        // Account creation
  updatedAt: Date         // Last profile update
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd team-availability-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Start MongoDB service
   mongod
   # Optional: Seed database
   node scripts/seed.js
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend  # or just root directory
   npm install
   npm run dev
   ```

4. **Access Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🔌 API Endpoints

### Team Member Management
- `GET /api/users` - Retrieve all team members
- `POST /api/users` - Create new team member
- `PUT /api/users/:id/status` - Update member status
- `PUT /api/users/:id/working-hours` - Update working hours
- `DELETE /api/users/:id` - Remove team member

### Real-time Events
- `status-update` - Broadcast status changes
- `member-added` - New member notifications
- `member-removed` - Member removal notifications

## 🎯 Use Cases

### Remote Teams
- **Distributed Workforce**: Perfect for teams across multiple time zones
- **Async Coordination**: Know when team members are available for collaboration
- **Meeting Scheduling**: See who's available before scheduling calls

### Office Environments
- **Hybrid Work**: Track both remote and in-office team members
- **Resource Planning**: Understand team capacity at a glance
- **Communication**: Reduce interruptions by respecting status indicators

### Project Management
- **Team Visibility**: Project managers can see team availability
- **Workload Distribution**: Balance tasks based on member availability
- **Status Reporting**: Real-time team status for stakeholders

## 🔮 Future Enhancements

### Planned Features
- **Calendar Integration**: Sync with Google Calendar, Outlook
- **Slack/Teams Integration**: Status sync with communication platforms
- **Mobile App**: Native iOS and Android applications
- **Advanced Analytics**: Detailed availability reports and insights
- **Custom Status**: User-defined availability states
- **Notification System**: Email/SMS alerts for status changes

### Technical Improvements
- **Performance Optimization**: Caching and query optimization
- **Security Enhancements**: Advanced authentication and authorization
- **Scalability**: Redis for session management, load balancing
- **Testing**: Comprehensive unit and integration tests

## 📈 Benefits

### For Team Members
- ✅ Clear communication of availability
- ✅ Reduced interruptions during focused work
- ✅ Better work-life balance awareness

### For Managers
- ✅ Real-time team visibility
- ✅ Improved resource planning
- ✅ Better meeting coordination

### For Organizations
- ✅ Enhanced team productivity
- ✅ Reduced communication overhead
- ✅ Improved remote work culture

## 🤝 Contributing

This project welcomes contributions! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🎨 UI/UX enhancements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Built with ❤️ for better team collaboration*
