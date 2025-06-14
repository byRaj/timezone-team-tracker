
# Team Availability Tracker

A real-time team availability tracking application built with React, TypeScript, and Tailwind CSS. Keep track of your team members' status, timezone, and working hours in a beautiful, responsive interface.

## Features

- 🟢 **Real-time Status Updates**: Live status tracking with WebSocket simulation
- 🌍 **Timezone Awareness**: Automatic timezone detection and local time display
- ⏰ **Working Hours**: Configurable working hours per team member
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Fully responsive across all devices
- 📊 **Team Overview**: Dashboard showing team status distribution

## Status Types

- **Available**: Ready for collaboration
- **Do Not Disturb**: Focused work, minimal interruptions
- **In a Meeting**: Currently in a meeting or call
- **Offline**: Not currently working

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd team-availability-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

1. **Set Your Status**: Use the status selector to update your current availability
2. **View Team Members**: See all team members with their current status, local time, and working hours
3. **Real-time Updates**: Watch as team members' statuses update automatically
4. **Timezone Support**: See each member's local time and whether they're within working hours

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Notifications**: Sonner (toast notifications)

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx       # App header with title and current time
│   ├── TeamMemberCard.tsx # Individual team member display
│   ├── StatusBadge.tsx  # Status indicator component
│   └── StatusSelector.tsx # Status selection interface
├── data/
│   └── mockData.ts      # Mock team member data
├── utils/
│   └── timeUtils.ts     # Timezone and time utilities
└── pages/
    └── Index.tsx        # Main application page
```

## Customization

### Adding Team Members

Edit `src/data/mockData.ts` to add or modify team members:

```typescript
{
  id: 'unique-id',
  name: 'Team Member Name',
  role: 'Job Title',
  avatar: 'https://avatar-url.com/image.jpg',
  status: 'available',
  timezone: 'America/New_York',
  location: 'City, Country',
  workingHours: { start: 9, end: 17 }
}
```

### Modifying Working Hours

Working hours are defined in 24-hour format:
- `start: 9` = 9:00 AM
- `end: 17` = 5:00 PM

### Customizing Status Types

Status types are defined in `src/data/mockData.ts`. You can modify the `Status` type and update the related components.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Future Enhancements

- 🔐 JWT Authentication
- 🗄️ MongoDB Integration
- 🔌 Real WebSocket Implementation (Socket.IO)
- 📧 Email Notifications
- 📈 Usage Analytics
- 👥 Team Management
- 🎯 Custom Status Messages
- 📅 Calendar Integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
