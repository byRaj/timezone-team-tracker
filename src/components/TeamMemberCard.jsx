
import { Clock, MapPin } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { isWithinWorkingHours, formatLocalTime } from '../utils/timeUtils';

export const TeamMemberCard = ({ member, isCurrentUser = false }) => {
  const localTime = formatLocalTime(member.timezone);
  const withinWorkingHours = isWithinWorkingHours(member.timezone, member.workingHours);
  
  const cardStyle = {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    border: isCurrentUser ? '2px solid #3b82f6' : '1px solid #374151',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px'
  };

  const avatarContainerStyle = {
    position: 'relative'
  };

  const avatarStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #374151'
  };

  const statusDotStyle = {
    position: 'absolute',
    bottom: '-4px',
    right: '-4px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #1e293b',
    backgroundColor: 
      member.status === 'available' ? '#10b981' :
      member.status === 'busy' ? '#ef4444' :
      member.status === 'in-meeting' ? '#f59e0b' : '#6b7280'
  };

  const userInfoStyle = {
    flex: 1,
    minWidth: 0
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const roleStyle = {
    fontSize: '14px',
    color: '#94a3b8',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#94a3b8',
    gap: '8px'
  };

  const workingHoursStyle = {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '20px',
    textAlign: 'center',
    backgroundColor: withinWorkingHours ? '#065f46' : '#374151',
    color: withinWorkingHours ? '#a7f3d0' : '#9ca3af'
  };

  const lastUpdatedStyle = {
    fontSize: '12px',
    color: '#6b7280'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={avatarContainerStyle}>
          <img
            src={member.avatar}
            alt={member.name}
            style={avatarStyle}
          />
          <div style={statusDotStyle} />
        </div>
        
        <div style={userInfoStyle}>
          <h3 style={nameStyle}>{member.name}</h3>
          <p style={roleStyle}>{member.role}</p>
        </div>
      </div>
      
      <div style={contentStyle}>
        <StatusBadge status={member.status} />
        
        <div style={infoRowStyle}>
          <Clock size={16} />
          <span>{localTime}</span>
        </div>
        
        <div style={infoRowStyle}>
          <MapPin size={16} />
          <span>{member.location}</span>
        </div>
        
        <div style={workingHoursStyle}>
          {withinWorkingHours ? 'Within working hours' : 'Outside working hours'}
        </div>
        
        {member.lastUpdated && (
          <p style={lastUpdatedStyle}>
            Last updated: {new Date(member.lastUpdated).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
};
