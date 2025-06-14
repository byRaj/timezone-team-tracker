
import { Status } from '../data/mockData';
import { Circle, Phone, Users, Power } from 'lucide-react';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    available: {
      label: 'Available',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: Circle,
      iconColor: 'text-green-600'
    },
    busy: {
      label: 'Do Not Disturb',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: Circle,
      iconColor: 'text-red-600'
    },
    'in-meeting': {
      label: 'In a Meeting',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: Users,
      iconColor: 'text-yellow-600'
    },
    offline: {
      label: 'Offline',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: Power,
      iconColor: 'text-gray-600'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${config.color}`}>
      <Icon className={`w-4 h-4 mr-2 ${config.iconColor}`} />
      {config.label}
    </div>
  );
};
