const mockTeamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    status: 'available',
    timezone: 'America/New_York',
    location: 'New York, NY, USA',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    status: 'busy',
    timezone: 'Europe/London',
    location: 'London, UK',
    workingHours: {
      start: 8,
      end: 16
    },
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b8d21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'in-meeting',
    timezone: 'America/Los_Angeles',
    location: 'Los Angeles, CA, USA',
    workingHours: {
      start: 7,
      end: 15
    },
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob.williams@example.com',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d674c8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'offline',
    timezone: 'Asia/Tokyo',
    location: 'Tokyo, Japan',
    workingHours: {
      start: 10,
      end: 18
    },
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Quality Assurance',
    avatar: 'https://images.unsplash.com/photo-1544005313-9431266e1830?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'available',
    timezone: 'Australia/Sydney',
    location: 'Sydney, Australia',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '6',
    name: 'Diana Miller',
    email: 'diana.miller@example.com',
    role: 'Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'busy',
    timezone: 'America/Toronto',
    location: 'Toronto, Canada',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '7',
    name: 'Eva Garcia',
    email: 'eva.garcia@example.com',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'in-meeting',
    timezone: 'Europe/Berlin',
    location: 'Berlin, Germany',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '8',
    name: 'Frank Lee',
    email: 'frank.lee@example.com',
    role: 'System Administrator',
    avatar: 'https://images.unsplash.com/photo-1534528741702-a0cfae562c9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'offline',
    timezone: 'Asia/Kolkata',
    location: 'Mumbai, India',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '9',
    name: 'Grace Chen',
    email: 'grace.chen@example.com',
    role: 'Network Engineer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'available',
    timezone: 'Asia/Singapore',
    location: 'Singapore',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '10',
    name: 'Henry Rodriguez',
    email: 'henry.rodriguez@example.com',
    role: 'Database Administrator',
    avatar: 'https://images.unsplash.com/photo-1587613754234-c39561716a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'busy',
    timezone: 'Asia/Dubai',
    location: 'Dubai, UAE',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '11',
    name: 'Isabella Silva',
    email: 'isabella.silva@example.com',
    role: 'Security Analyst',
    avatar: 'https://images.unsplash.com/photo-1618043826744-e99c7924c05f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'in-meeting',
    timezone: 'America/Sao_Paulo',
    location: 'São Paulo, Brazil',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '12',
    name: 'Jack Taylor',
    email: 'jack.taylor@example.com',
    role: 'Cloud Architect',
    avatar: 'https://images.unsplash.com/photo-1618043963993-9ff6b04849ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'offline',
    timezone: 'America/Mexico_City',
    location: 'Mexico City, Mexico',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  },
  {
    id: '13',
    name: 'Kate Wilson',
    email: 'kate.wilson@example.com',
    role: 'Mobile App Developer',
    avatar: 'https://images.unsplash.com/photo-1618044056088-4a449149c942?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHRlYW0lMjBtZW1iZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    status: 'available',
    timezone: 'Africa/Cairo',
    location: 'Cairo, Egypt',
    workingHours: {
      start: 9,
      end: 17
    },
    lastUpdated: new Date()
  }
];

export default mockTeamMembers;
