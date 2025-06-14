
export type Status = 'available' | 'busy' | 'in-meeting' | 'offline';

export interface WorkingHours {
  start: number; // 24-hour format (e.g., 9 for 9 AM)
  end: number;   // 24-hour format (e.g., 17 for 5 PM)
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: Status;
  timezone: string;
  location: string;
  workingHours: WorkingHours;
  lastUpdated?: Date;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'You',
    role: 'Software Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'available',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    location: 'Local',
    workingHours: { start: 9, end: 17 },
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b25ce3c4?w=150&h=150&fit=crop&crop=face',
    status: 'available',
    timezone: 'America/New_York',
    location: 'New York, USA',
    workingHours: { start: 9, end: 17 },
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'David Chen',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'in-meeting',
    timezone: 'Asia/Shanghai',
    location: 'Shanghai, China',
    workingHours: { start: 9, end: 18 },
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'busy',
    timezone: 'America/Los_Angeles',
    location: 'San Francisco, USA',
    workingHours: { start: 9, end: 17 },
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Michael Brown',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'available',
    timezone: 'Europe/London',
    location: 'London, UK',
    workingHours: { start: 8, end: 16 },
    lastUpdated: new Date()
  },
  {
    id: '6',
    name: 'Lisa Wong',
    role: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    status: 'offline',
    timezone: 'Australia/Sydney',
    location: 'Sydney, Australia',
    workingHours: { start: 9, end: 17 },
    lastUpdated: new Date()
  },
  {
    id: '7',
    name: 'James Wilson',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    status: 'available',
    timezone: 'Europe/Berlin',
    location: 'Berlin, Germany',
    workingHours: { start: 9, end: 17 },
    lastUpdated: new Date()
  },
  {
    id: '8',
    name: 'Priya Patel',
    role: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    status: 'in-meeting',
    timezone: 'Asia/Kolkata',
    location: 'Mumbai, India',
    workingHours: { start: 10, end: 18 },
    lastUpdated: new Date()
  }
];
