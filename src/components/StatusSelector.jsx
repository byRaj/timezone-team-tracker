
import { StatusBadge } from './StatusBadge';

export const StatusSelector = ({ currentStatus, onStatusChange }) => {
  const statuses = ['available', 'busy', 'in-meeting', 'offline'];

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-gray-800 dark:text-gray-200">Update your status:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              currentStatus === status
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
            }`}
          >
            <StatusBadge status={status} />
          </button>
        ))}
      </div>
    </div>
  );
};
