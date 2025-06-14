import { StatusBadge } from './StatusBadge';

export const StatusSelector = ({ currentStatus, onStatusChange }) => {
  const statuses = ['available', 'busy', 'in-meeting', 'offline'];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  };

  const getButtonStyle = (status) => ({
    padding: '12px',
    borderRadius: '8px',
    border: currentStatus === status ? '2px solid #3b82f6' : '2px solid #374151',
    backgroundColor: currentStatus === status ? '#1e3a8a' : '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.05)',
      borderColor: currentStatus === status ? '#3b82f6' : '#4b5563'
    }
  });

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Update your status:</h3>
      <div style={gridStyle}>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            style={getButtonStyle(status)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.borderColor = currentStatus === status ? '#3b82f6' : '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.borderColor = currentStatus === status ? '#3b82f6' : '#374151';
            }}
          >
            <StatusBadge status={status} />
          </button>
        ))}
      </div>
    </div>
  );
};
