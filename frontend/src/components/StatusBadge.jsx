import { Circle, Phone, Users, Power } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    available: {
      label: 'Available',
      backgroundColor: '#065f46',
      textColor: '#a7f3d0',
      borderColor: '#047857',
      icon: Circle,
      iconColor: '#10b981'
    },
    busy: {
      label: 'Do Not Disturb',
      backgroundColor: '#7f1d1d',
      textColor: '#fca5a5',
      borderColor: '#dc2626',
      icon: Circle,
      iconColor: '#ef4444'
    },
    'in-meeting': {
      label: 'In a Meeting',
      backgroundColor: '#78350f',
      textColor: '#fcd34d',
      borderColor: '#f59e0b',
      icon: Users,
      iconColor: '#f59e0b'
    },
    offline: {
      label: 'Offline',
      backgroundColor: '#374151',
      textColor: '#d1d5db',
      borderColor: '#6b7280',
      icon: Power,
      iconColor: '#9ca3af'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    border: `1px solid ${config.borderColor}`,
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    gap: '8px'
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    color: config.iconColor
  };

  return (
    <div style={badgeStyle}>
      <Icon style={iconStyle} />
      {config.label}
    </div>
  );
};
