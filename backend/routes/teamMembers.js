
const express = require('express');
const TeamMember = require('../models/TeamMember');
const router = express.Router();

// GET all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
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
        status: 'available'
      });
      await currentUser.save();
    }
    
    res.json(currentUser);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST create new team member
router.post('/', async (req, res) => {
  try {
    const member = new TeamMember(req.body);
    await member.save();
    
    // Emit WebSocket event
    req.app.get('io').emit('member-added', member);
    
    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update member status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
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
    
    res.json(member);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update working hours
router.put('/:id/working-hours', async (req, res) => {
  try {
    const { workingHours } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { workingHours, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(member);
  } catch (error) {
    console.error('Error updating working hours:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update timezone
router.put('/:id/timezone', async (req, res) => {
  try {
    const { timezone } = req.body;
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { timezone, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(member);
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
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
