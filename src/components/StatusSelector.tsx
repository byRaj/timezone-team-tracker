
import { Status } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

interface StatusSelectorProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

export const StatusSelector = ({ currentStatus, onStatusChange }: StatusSelectorProps) => {
  const statuses: Status[] = ['available', 'busy', 'in-meeting', 'offline'];

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-800">Update your status:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              currentStatus === status
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <StatusBadge status={status} />
          </button>
        ))}
      </div>
    </div>
  );
};
