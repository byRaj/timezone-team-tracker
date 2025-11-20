
const express = require('express');
const TeamMember = require('../models/TeamMember');
const router = express.Router();

// GET all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    // Ensure working hours are properly formatted
    const formattedMembers = members.map(member => ({
      ...member.toObject(),
      workingHours: {
        start: member.workingHours?.start || '09:00',
        end: member.workingHours?.end || '17:00'
      }
    }));
    res.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET current user (for demo, returns first user or creates one)
router.get('/me', async (req, res) => {
  try {
    let currentUser = await TeamMember.findOne({ role: 'admin' });
    
    if (!currentUser) {
      // Create a default admin user if none exists
      currentUser = new TeamMember({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA',
        timezone: 'America/Los_Angeles',
        status: 'available',
        workingHours: {
          start: '09:00',
          end: '17:00'
        }
      });
      const savedUser = await currentUser.save();
      return res.json(savedUser.toObject());
    }
    
    res.json(currentUser.toObject());
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST create new team member
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      avatar,
      status,
      timezone,
      location,
      workingHours = {}
    } = req.body;

    // Only hard-require name + email
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields: name, email' });
    }

    // Build clean member data with sensible defaults
    const memberData = {
      name,
      email,
      role: role || 'member',
      avatar: avatar || '👤',
      status: status || 'available',
      timezone: timezone || 'Asia/Kolkata',
      location: location || 'Unknown',
      workingHours: {
        start: workingHours.start || '09:00',
        end: workingHours.end || '17:00',
      },
    };

    // (Optional) validate working hours format
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(memberData.workingHours.start) || !timeRegex.test(memberData.workingHours.end)) {
      return res.status(400).json({ error: 'Invalid working hours format. Use HH:MM (24-hour).' });
    }

    const member = new TeamMember(memberData);
    const savedMember = await member.save();

    // Emit WebSocket event if io exists
    const io = req.app.get('io');
    if (io) {
      io.emit('member-added', savedMember.toObject());
    }

    res.status(201).json(savedMember.toObject());
  } catch (error) {
    console.error('Error creating team member:', error);

    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT update member status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status value
    const validStatuses = ['available', 'busy', 'in-meeting', 'offline'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }
    
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { status, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    // Emit WebSocket event
    req.app.get('io').emit('status-update', {
      memberId: member._id,
      status: member.status,
      lastUpdated: member.lastUpdated
    });
    
    res.json(member.toObject());
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update working hours
router.put('/:id/working-hours', async (req, res) => {
  try {
    const { workingHours } = req.body;
    
    // Validate working hours format
    if (workingHours) {
      const startMatch = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(workingHours.start || '');
      const endMatch = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(workingHours.end || '');
      if (!startMatch || !endMatch) {
        return res.status(400).json({ error: 'Invalid working hours format. Use HH:MM format (24-hour)' });
      }
    }
    
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { workingHours, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(member.toObject());
  } catch (error) {
    console.error('Error updating working hours:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update timezone
router.put('/:id/timezone', async (req, res) => {
  try {
    const { timezone } = req.body;
    
    if (!timezone) {
      return res.status(400).json({ error: 'Timezone is required' });
    }
    
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { timezone, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(member.toObject());
  } catch (error) {
    console.error('Error updating timezone:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    // Emit WebSocket event
    req.app.get('io').emit('member-removed', { memberId: req.params.id });
    
    res.json({ 
      message: 'Team member deleted successfully',
      deletedMember: member.toObject()
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
