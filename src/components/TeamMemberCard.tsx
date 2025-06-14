
import { Clock, MapPin } from 'lucide-react';
import { TeamMember } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { isWithinWorkingHours, formatLocalTime } from '../utils/timeUtils';

interface TeamMemberCardProps {
  member: TeamMember;
  isCurrentUser?: boolean;
}

export const TeamMemberCard = ({ member, isCurrentUser = false }: TeamMemberCardProps) => {
  const localTime = formatLocalTime(member.timezone);
  const withinWorkingHours = isWithinWorkingHours(member.timezone, member.workingHours);
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border ${
      isCurrentUser ? 'border-blue-300 ring-2 ring-blue-100 dark:border-blue-600 dark:ring-blue-800' : 'border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-600"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
            member.status === 'available' ? 'bg-green-500' :
            member.status === 'busy' ? 'bg-red-500' :
            member.status === 'in-meeting' ? 'bg-yellow-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{member.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{member.role}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <StatusBadge status={member.status} />
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2" />
          <span>{localTime}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{member.location}</span>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full text-center ${
          withinWorkingHours 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {withinWorkingHours ? 'Within working hours' : 'Outside working hours'}
        </div>
        
        {member.lastUpdated && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {member.lastUpdated.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
};
