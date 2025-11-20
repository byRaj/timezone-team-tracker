
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';

// Simple timezone mapping for common locations
const TIMEZONE_MAP = {
  'New York, NY, USA': 'America/New_York',
  'Los Angeles, CA, USA': 'America/Los_Angeles',
  'Chicago, IL, USA': 'America/Chicago',
  'London, UK': 'Europe/London',
  'Paris, France': 'Europe/Paris',
  'Tokyo, Japan': 'Asia/Tokyo',
  'Sydney, Australia': 'Australia/Sydney',
  'Toronto, Canada': 'America/Toronto',
  'Berlin, Germany': 'Europe/Berlin',
  'Mumbai, India': 'Asia/Kolkata',
  'Singapore': 'Asia/Singapore',
  'Dubai, UAE': 'Asia/Dubai',
  'São Paulo, Brazil': 'America/Sao_Paulo',
  'Mexico City, Mexico': 'America/Mexico_City',
  'Cairo, Egypt': 'Africa/Cairo'
};

const getTimezoneForLocation = (location) => {
  const normalizedLocation = location.toLowerCase();
  
  for (const [key, timezone] of Object.entries(TIMEZONE_MAP)) {
    if (key.toLowerCase().includes(normalizedLocation) || normalizedLocation.includes(key.toLowerCase().split(',')[0].toLowerCase())) {
      return timezone;
    }
  }
  
  // Fallback to UTC if no match found
  return 'UTC';
};

export const AddPersonForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member',
    avatar: '',
    status: 'available',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    location: '',
    workingHours: { start: '09:00', end: '17:00' }
  });

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const locationInputRef = useRef(null);

  const handleLocationChange = (value) => {
    setFormData(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      const suggestions = Object.keys(TIMEZONE_MAP).filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }

    // Auto-detect timezone
    if (value.length > 3) {
      const detectedTimezone = getTimezoneForLocation(value);
      setFormData(prev => ({ ...prev, timezone: detectedTimezone }));
    }
  };

  const handleLocationSelect = (selectedLocation) => {
    setFormData(prev => ({ 
      ...prev, 
      location: selectedLocation,
      timezone: TIMEZONE_MAP[selectedLocation] || 'UTC'
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.location) {
      alert('Please fill in all required fields: Name, Email, and Location');
      return;
    }
    
    onAdd(formData);
    setFormData({
      name: '',
      email: '',
      role: 'member',
      avatar: '',
      status: 'available',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: '',
      workingHours: { start: '09:00', end: '17:00' }
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Full Name *</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Email *</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email address"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Role</label>
        <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium">Avatar URL</label>
        <Input
          value={formData.avatar}
          onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
          placeholder="https://images.unsplash.com/..."
        />
      </div>
      
      <div className="relative">
        <label className="text-sm font-medium">Location *</label>
        <Input
          ref={locationInputRef}
          value={formData.location}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder="City, Country"
          onFocus={() => formData.location.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          required
        />
        {showSuggestions && locationSuggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {locationSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                onMouseDown={() => handleLocationSelect(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label className="text-sm font-medium">Timezone</label>
        <Input
          value={formData.timezone}
          onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
          placeholder="America/New_York"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Start Time</label>
          <Input
            type="time"
            value={formData.workingHours.start}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, start: e.target.value }
            }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium">End Time</label>
          <Input
            type="time"
            value={formData.workingHours.end}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              workingHours: { ...prev.workingHours, end: e.target.value }
            }))}
          />
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Person
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
