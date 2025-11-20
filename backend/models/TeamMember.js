
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    required: true 
  },
  avatar: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['available', 'busy', 'in-meeting', 'offline'],
    default: 'offline'
  },
  timezone: { 
    type: String, 
    required: true,
    default: 'UTC'
  },
  location: { 
    type: String, 
    required: true 
  },
  workingHours: {
    start: { 
      type: String,
      match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      required: true,
      default: '09:00'
    },
    end: { 
      type: String,
      match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      required: true,
      default: '17:00'
    }
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

// Update lastUpdated field before saving
teamMemberSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
