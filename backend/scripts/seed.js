
const mongoose = require('mongoose');
const TeamMember = require('../models/TeamMember');
require('dotenv').config();

const seedData = [
  {
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    status: 'available'
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    role: 'developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'New York, NY',
    timezone: 'America/New_York',
    status: 'busy'
  },
  {
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    role: 'designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Los Angeles, CA',
    timezone: 'America/Los_Angeles',
    status: 'in-meeting'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/team-tracker');
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await TeamMember.deleteMany({});
    console.log('Cleared existing team members');
    
    // Insert seed data
    await TeamMember.insertMany(seedData);
    console.log('Seed data inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
