
import { WorkingHours } from '../data/mockData';

export const formatLocalTime = (timezone: string): string => {
  try {
    const now = new Date();
    return now.toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  } catch (error) {
    console.error('Error formatting time for timezone:', timezone, error);
    return 'Time unavailable';
  }
};

export const isWithinWorkingHours = (timezone: string, workingHours: WorkingHours): boolean => {
  try {
    const now = new Date();
    const timeInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const currentHour = timeInTimezone.getHours();
    
    return currentHour >= workingHours.start && currentHour < workingHours.end;
  } catch (error) {
    console.error('Error checking working hours for timezone:', timezone, error);
    return false;
  }
};

export const getTimezoneOffset = (timezone: string): string => {
  try {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (getTimezoneOffsetInMs(timezone)));
    
    const offsetHours = Math.floor(getTimezoneOffsetInMs(timezone) / (1000 * 60 * 60));
    const offsetMinutes = Math.abs(Math.floor((getTimezoneOffsetInMs(timezone) % (1000 * 60 * 60)) / (1000 * 60)));
    
    const sign = offsetHours >= 0 ? '+' : '-';
    return `${sign}${Math.abs(offsetHours).toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error getting timezone offset:', error);
    return '+00:00';
  }
};

const getTimezoneOffsetInMs = (timezone: string): number => {
  const now = new Date();
  const localTime = now.getTime();
  const localOffset = now.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  
  const targetDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
  const targetTime = targetDate.getTime();
  
  return targetTime - utc;
};
